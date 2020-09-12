import axios from "axios";
import React, { useEffect, useState } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import MomentLocaleUtils from "react-day-picker/moment";
import { Button, Col, Container, Row, Label } from "reactstrap";
import { Game, GamePlayer, Player, Option } from "server/Models/UltimateModels";
import Select from "react-select";

export const GamePlayers: React.FC = () => {
  const [gameDay, setGameDay] = useState<Date>();
  const [gamesList, setGamesList] = useState<Game[]>([]);
  const [playersList, setPlayers] = useState<Player[]>([]);
  const [optionsList, setOptions] = useState<Option[]>([]);
  // Prepare state hook for users list
  // It specifies the shape of usersList state
  const [gamePlayersList, setGamePlayers] = useState<GamePlayer[]>([]);
  const [order, setOrder] = useState<number>();
  // Use useEffect to call fetchMessage() on initial render
  useEffect(() => {
    fetchPlayers();
  }, []);

  // Create async function for fetching users list
  const fetchGamePlayers = async () => {
    const gamePlayers = await axios
      .get("/gameplayers/all")
      .then((res) => res.data); // Process the incoming data
    // Update usersList state
    setGamePlayers(gamePlayers);
  };

  const fetchGames = async () => {
    const games = await axios
      .get("/games/findGames?date=" + gameDay)
      .then((res) => res.data);

    setGamesList(games);
  };

  const fetchPlayers = async () => {
    const players = (await axios
      .get("/players/all")
      .then((res) => res.data)) as Player[]; // Process the incoming data

    var options = players.map((item) => {
      return { value: item.id, label: item.name } as Option;
    });

    setOptions(options);
  };

  const createGamePlayers = async () => {
    var res = await axios.post("/gameplayers/create", {
      date: gameDay,
      order: order,
    });

    await fetchGamePlayers();
  };

  const clearGamePlayers = async () => {
    var res = await axios.delete("/gameplayers/deleteAll");
    await fetchGamePlayers();
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
          <Label>Game Date:</Label>
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
      </Row>
      <Button onClick={fetchGames}>Find Games</Button>
      <Row>
        <Col>
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
                    <td>Game {game.order}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Col>
        <Col>
          <Label>Winners:</Label>
          <Select closeMenuOnSelect={false} isMulti options={optionsList} />
          {/* {playersList.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>Winners</th>
                </tr>
              </thead>

              <tbody>
                {playersList.map((player: Player, index) => (
                  <tr key={index}>
                    <td>
                      <Input type="checkbox" />
                      {player.name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )} */}
        </Col>
      </Row>
      {/* Display table of users after fetching users data */}
    </Container>
  );
};
