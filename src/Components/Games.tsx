import axios from "axios";
import React, { useEffect, useState } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { Button, Input, Container, Row, Col } from "reactstrap";
import { Game } from "server/Models/UltimateModels";
import moment from "moment";
import MomentLocaleUtils from "react-day-picker/moment";

export const Games: React.FC = () => {
  const [gameDay, setGameDay] = useState<Date>();
  // Prepare state hook for users list
  // It specifies the shape of usersList state
  const [gamesList, setGames] = useState<Game[]>([]);
  const [order, setOrder] = useState<number>(1);
  // Use useEffect to call fetchMessage() on initial render
  useEffect(() => {
    fetchGames();
  }, []);

  // Create async function for fetching users list
  const fetchGames = async () => {
    const games = await axios.get("/games/all").then((res) => res.data); // Process the incoming data

    // Update usersList state
    setGames(games);
  };

  const createGame = async () => {
    var res = await axios.post("/games/create", {
      date: gameDay,
      order: order,
    });

    await fetchGames();
  };

  const clearGames = async () => {
    var res = await axios.delete("/games/deleteAll");
    await fetchGames();
  };

  const handleDayChange = (
    selectedDay: Date,
    modifiers: any,
    dayPickerInput: any
  ) => {
    setGameDay(selectedDay);
  };

  return (
    <Container>
      <Row>
        <Col xs="2">
          <DayPickerInput
            value={gameDay}
            onDayChange={handleDayChange}
            parseDate={MomentLocaleUtils.parseDate}
            formatDate={MomentLocaleUtils.formatDate}
            placeholder={`${MomentLocaleUtils.formatDate(new Date())}`}
            dayPickerProps={{
              selectedDays: gameDay,
            }}
          />
        </Col>
        <Col xs={{ size: 3, offset: 1 }}>
          <Input
            type="number"
            onChange={(e) => setOrder(parseInt(e.target.value))}
            value={order}
          />
        </Col>
      </Row>
      <Button onClick={createGame}>Submit</Button>
      <Button onClick={clearGames}>Clear List</Button>
      {/* Display table of users after fetching users data */}
      {gamesList.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {gamesList.map((game: Game, index) => (
              <tr key={index}>
                <td>{moment(game.date).format("MM/DD/YYYY")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Container>
  );
};
