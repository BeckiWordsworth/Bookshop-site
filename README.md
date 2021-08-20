# Team Project: Rating websites! 

For this team challenge it's time to focus more on how to build interfaces and interactive, useful applications. It's also a chance to wrap up everything you've learnt so far, and build an application with both a frontend and a backend. We’ll be working with Fyndiq and YDB for this sprint so the theme will be fun products! The focus is on the API and the backend part, not design for this one. Better to take on a few of the stretch goals than spend lots of time with css. 

The site will give you the possibility to add and rate products. If you want a specific theme of products – go nuts! 

The mvp for this page is fairly small, we’ve added plenty of stretch goals so that you can take this project in the direction you would like. 

_Your page should have the following mvp features and views:_

* **Add new products to the page.** Anyone that comes to this site can upload a product with a minimum of product title, image url (start with just a url to make things easier, and leave image upload as a stretch goal), description and category. 
* **Rate existing products.** Optional scale. 
* **Top list of highest rated products.**

_Technical Requirements:_
* React frontend
* API in Express
* MongoDB as a database to store products and ratings. 

## How to complete this project

The project should be built in React with a Node backend and Mongo database. It should also be responsive and work well on mobile, tablet and desktop. Your code should conform to the Technigo eslint rules, too.

This repository contains a copy of the Technigo React Starter project for the frontend, and an empty express server setup. You should use this as a base for your project.

## How to approach this as a team

The first step, as always, should be to sketch out your application and decide how things should look, and what kind of components you'd like. _Give thought - as a team - as to what components you might need, and what naming you should use._

Like the previous group assignment, this task is quite open, which means you must be careful to limit the scope of your project. Make sure to concentrate on what is necessary first, before adding more features and bling.

Once you have an idea of the design of the app, and what kind of components you'll need, you should consider which endpoints you need in your API and how to structure the data in your database. For example, one endpoint that fetches all products would be a good idea. You could also consider a different end-point for the top rating so that your front-end doesn’t have to work as hard. This will be easier to visualize after the first couple of lectures in this sprint.

## 💥 Success!

At the end of this sprint you will have the knowledge of how to build full applications with both a front and a backend. You will have practiced you Node.js knowledge and understood how APIs work, and how to build them.

## 🏃 Stretch Goals

Ideas for your project, **in no particular order.** If you don’t like them – make up your own. 

* Make it possible to everyone to **update product data.** (Difficulty: Medium)

* **Add more categories for rating** and create an algorithm that weigh in all categories in the listing. For example, you could have an overall rating, a rating for functionality, a rating for looks, etc. (Difficulty: Medium).

* **Add a login function** so that you need to login to be able to add products. Mix this together with only being able to update products you’ve added for an extra challenge! (Difficulty: Hard).

* **Server side validation** make sure your server validates your input data and checks that the image link is a link, there’s text in the description etc. (Difficulty: Medium).

* **Pagination via the API.** Imagine your products database had 50,000 entries in it. You can’t return all of those in one response without it taking ages to load. A common way to solve this problem is to make your endpoints accept a “page” number. So the frontend could request page 1 first, then page 2, etc, and the backend returns only the entries needed for that result set. (Difficulty: Medium-hard).

* **Upload images** instead of using image links. (Difficulty: Potentially super-hard, depending on approach).
