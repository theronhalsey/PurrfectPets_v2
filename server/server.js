// Dependencies
// =============================================================
import express from 'express';
import cors from 'cors';
import Petfinder from './Petfinder.js';



// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(cors());
app.use(express.json());


// Static directory to be served
app.use(express.static("dist"));

const router = express.Router();

router.get("/getPets", (req, res) => {
    res.json(Petfinder.getPets())
});

app.use(router);

// LISTENER
app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});

