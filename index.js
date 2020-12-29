const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')
const app = express();
const mongoose = require("mongoose");
app.use(bodyParser.json());
app.use(cors())
mongoose.connect(
  "mongodb+srv://truquito:12345@cluster0.xrofo.mongodb.net/truquito?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const Game = mongoose.model("Game", {
  gameId: String,
  player: { name: String, score: Number },
  oponent: { name: String, score: Number },
});

app.get("/", (req, res) => {
  Game.find((err, games) => {
    res.json(games);
  });
});

app.get("/:gameId", (req, res) => {
  Game.find({ gameId: req.params.gameId }, (err, games) => {
    res.json(games);
  });
});

app.post("/start/:gameId", (req, res) => {
  const game = new Game({
    gameId: req.params.gameId,
    player: { name: req.body.player.name, score: req.body.player.score },
    oponent: { name: req.body.oponent.name, score: req.body.oponent.score },
  });
  game.save().then(() => res.json(game));
});

app.post("/game/:gameId", (req, res) => {
  Game.findOneAndReplace(
    { gameId: req.params.gameId },
    {
      gameId: req.params.gameId,
      player: { name: req.body.player.name, score: req.body.player.score },
      oponent: { name: req.body.oponent.name, score: req.body.oponent.score },
    },
    null,
    (err, doc, resp) => {
      res.json(resp);
    }
  );
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`running at ${process.env.PORT || 3000}`);
});
