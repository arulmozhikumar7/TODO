const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const ConnectDb = require("./db/config");

ConnectDb();
app.use(cors());
app.use(express.json());

const routes = require("./routes");

app.use("/api", routes);
app.get("/", (req, res) => {
  res.send("Arul'sTO-DO Server");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
