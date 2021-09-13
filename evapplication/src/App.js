import React, { Component } from "react";
import HomeScreen from "./HomeScreen";
import HomeHeader from "./HomeHeader";
import { Switch, Route } from "react-router";
import Quiz from "./Quiz";
import Results from "./Results";
const Main = () => (
  //routing
  <Switch>
    <Route exact path="/" component={HomeScreen} />
    <Route exact path="/quiz" component={Quiz} />
    <Route path="/quiz/results/" component={Results} />
  </Switch>
);

class App extends Component {
  render() {
    return (
      <div className="quiz">
        <HomeHeader />
        <Main />
      </div>
    );
  }
}

export default App;
