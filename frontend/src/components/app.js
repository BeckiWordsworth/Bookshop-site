import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import LandingPage from "./landingPage/landingPage"
import AdminPage from "./adminPage/adminPage"

class App extends React.Component {

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/admin" exact component={AdminPage} />
          </Switch>
        </div>
      </Router>
    )
  }

}

export default App
