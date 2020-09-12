// Import necessary dependencies
import React from "react";
import "react-day-picker/lib/style.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Games } from "./Games";
import Navbar from "./Navbar";
import { Players } from "./Players";
import { GamePlayers } from "./GamePlayers";
// Create interface for user object (TypeScript only)

// Create App component
const App: React.FC = () => {
  // Prepare state hook for welcome message

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/Games" exact component={Games} />
        <Route path="/Players" component={Players} />
        <Route path="/UpdateStats" component={GamePlayers} />
        <Route path="/*" component={Players} />
      </Switch>
    </Router>
  );
};

export default App;
