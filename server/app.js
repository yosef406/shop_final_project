// imports
const express = require("express");
const cors = require('cors');
const DataBase = require("./database/DataBase");
const usersRoute = require("./routes/users.route");
const productsRoute = require("./routes/products.route");
const cartsRoute = require("./routes/cart.route");
const categoryRoute = require("./routes/category.route");

// setups
const app = express();
const PORT = process.env.PORT;

// uses
app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use("/api/user", usersRoute);
app.use("/api/product", productsRoute);
app.use("/api/cart", cartsRoute);
app.use("/api/category", categoryRoute);


app.get("/", (req, res) => {
    res.send("welcome");
});

DataBase.connect().then(() =>
    app.listen(PORT, () => console.log(`server listening on http://localhost:${PORT}`)))
    .catch((err) => console.log(err));