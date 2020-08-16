import React, { useState, useEffect } from "react";
import { Player } from "server/Models/UltimateModels";
import axios from 'axios';
import Navbar from "./Navbar";
import { Button, Input } from "reactstrap";
export const Players: React.FC = () => {
  const [name, setName] = useState("");
  // Prepare state hook for users list
  // It specifies the shape of usersList state
  const [playersList, setPlayers] = useState<Player[]>([]);
  
  // Use useEffect to call fetchMessage() on initial render
  useEffect(() => {
    fetchPlayers();
  }, []);

  // Create async function for fetching users list
  const fetchPlayers = async () => {
    const players = await fetch("/players/all").then((res) => res.json()); // Process the incoming data

    // Update usersList state
    setPlayers(players);
  };

  const createPlayer = async () => {
    console.log("Name: ", name);
    var res = await axios.post("/players/create", {name: name});

    await fetchPlayers();
  }

  const clearPlayers = async () => {
    console.log("TEST");
    var res = await axios.delete("/players/deleteAll");
    await fetchPlayers();
  }

  return (
    <div className="app">
      <header className="app-header">
        <Input size={3} onChange={(e) => setName(e.target.value)} value={name} type="text" /> 
        <Button onClick={createPlayer}>Submit</Button>
        <Button onClick={clearPlayers}>Clear List</Button>
        {/* Display table of users after fetching users data */}
        {playersList.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Name</th>
              </tr>
            </thead>

            <tbody>
              {playersList.map((player: Player, index) => (
                <tr key={index}>
                  <td>{player.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </header>
    </div>
  );
};
