import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Input, Container, Row, Col } from "reactstrap";
import { Player } from "server/Models/UltimateModels";
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
    const players = await axios.get("/players/all").then((res) => res.data); // Process the incoming data

    setPlayers(players);
  };

  const createPlayer = async () => {
    console.log("Name: ", name);
    var res = await axios.post("/players/create", { name: name });

    await fetchPlayers();
  };

  const clearPlayers = async () => {
    var res = await axios.delete("/players/deleteAll");
    await fetchPlayers();
  };

  return (
    <Container>
      <Row>
        <Col xs="3">
          <Input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
          />
        </Col>
      </Row>

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
    </Container>
  );
};
