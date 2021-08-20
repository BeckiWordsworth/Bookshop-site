import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcrypt-nodejs";
import uuid from "uuid/v4";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

mongoose.connect("mongodb://mongoDB/books-api", { useMongoClient: true });

mongoose.Promise = Promise;

mongoose.connection.on("error", err => console.error("Connection error:", err));
mongoose.connection.once("open", () => console.log("Connected to mongodb"));

const Book = mongoose.model("Book", {
  author: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    unique: true,
    required: true
  }
});

// GET all books + search queries where necessary
app.get("/books", (req, res) => {
  let genre = req.query.genre;
  let title = req.query.title;
  let author = req.query.author;
  let sortBy = req.query.sortBy;
  let limit = req.query.limit;
  let query = req.query.query;
  //pagination
  let skip = req.query.skip || 0;

  if (limit === undefined) {
    limit = 12;
  }

  if (sortBy === undefined) {
    sortBy = "title";
  }

  let dbQuery = Book.find();

  if (title !== undefined) {
    dbQuery.where("title").regex(new RegExp(title, "i"));
  }

  if (genre !== undefined) {
    dbQuery.where("genre").regex(new RegExp(genre, "i"));
  }

  if (author !== undefined) {
    dbQuery.where("author").regex(new RegExp(author, "i"));
  }

  if (query !== undefined) {
    //dbQuery.or().where('title').regex(query).where('genre').regex(query)
  }

  dbQuery.limit(parseInt(limit));
  dbQuery.sort({ [sortBy]: 1 });

  //pagination
  dbQuery.skip(parseInt(skip));
  // dbQuery.select({title: 1, author: 1})
  dbQuery.then(books => {
    let result = books;
    result = result.slice(0, limit);
    let jsonResult = JSON.stringify(result, null, 4);

    res.setHeader("content-type", "application/json");
    res.send(jsonResult);
  });
});

// POST single book to db
app.post("/books", (req, res) => {
  const book = new Book(req.body);
  book
    .save()
    .then(() => {
      res.status(201).send("Book added");
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

// PUT updated book ratings in db
app.put("/books/:id", (req, res) => {
  const id = req.params.id;
  Book.findOneAndUpdate(
    { _id: id }, // search db by book id
    { $inc: { rating: 1 } } // increase rating by 1
  ).then(() => {
    Book.findOne({ _id: id });
  }, res.send(id));
});

// GET top-rated books
app.get("/books/top", (req, res) => {
  Book.find()
    .sort({ rating: -1 })
    .limit(5)
    .then(books => {
      res.json(books);
    });
});

// Delete book in db
app.delete("/books/:id", function(req, res) {
  let query = { _id: req.params };
  Book.remove(query, function(err, books) {
    if (err) {
      console.log("Delete book: ", err);
    }
    res.json(books);
  });
});

/////////////////// User model and endpoints ////////////////////

const User = mongoose.model("User", {
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  accessToken: {
    type: String,
    default: () => uuid()
  }
});

// POST new user to user db
app.post("/users", (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password)
  });
  newUser
    .save()
    .then(() => {
      res.status(201).json({ created: true });
    })
    .catch(err => {
      res.status(400).json({ created: false, error: err });
    });
});

// POST new session (i.e. log in) to user db
app.post("/sessions", (req, res) => {
  User.findOne({ username: req.body.username })
    .then(user => {
      if (user && bcrypt.compareSync(req.body.password, user.password)) {
        res.json({ id: user.id, accessToken: user.accessToken });
      } else {
        res.send("Username or password not found");
      }
    })
    .catch(err => {
      res.json(err);
    });
});

// endpoint to get info from db (if user is authenticaed)
// app.post("/users/:id/admin", (req, res) => {
// })

app.listen(8080, () => console.log("Books API listening on port 8080!"));
