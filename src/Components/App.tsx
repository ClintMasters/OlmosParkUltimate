// Import necessary dependencies
import React, { useEffect, useState } from "react";
import { Player } from "server/Models/UltimateModels";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Players } from './Players';
import Navbar from './Navbar';
// Create interface for user object (TypeScript only)

// Create App component
const App: React.FC = () => {
  // Prepare state hook for welcome message
  

  return (
    <Router>
      <Navbar />
      <Route path="/*" component={Players} />
    </Router>
  );
};

export default App;
