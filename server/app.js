// imports
const express = require("express");
const dotenv = require('dotenv');
const cors = require('cors');
const DataBase = require("./database/DataBase");
const usersRoute = require("./routes/users.route");
const productsRoute = require("./routes/products.route");


// setups
const app = express();
dotenv.config();
const PORT = process.env.PORT;

// uses
app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use("/api/user", usersRoute);
app.use("/api/products", productsRoute);


app.get("/", (req, res) => {
    res.send("welcome");
});

DataBase.connect().then(() =>
    app.listen(PORT, () => console.log(`server listening on http://localhost:${PORT}`)))
    .catch((err) => console.log(err));