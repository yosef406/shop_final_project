// imports
const express = require("express");
const dotenv = require('dotenv');
const cors = require('cors');


// setups
const app = express();
dotenv.config();
const PORT = process.env.PORT;

// uses
app.use(cors());
app.use(express.json({ limit: "25mb" }));

app.get("/", (req, res) => {
    res.send("welcome");
});

app.listen(PORT, () => console.log(`server listening on http://localhost:${PORT}`));