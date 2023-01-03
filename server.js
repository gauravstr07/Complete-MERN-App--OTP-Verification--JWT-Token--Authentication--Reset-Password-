/** importing dependencies */
const express = require("express");
const cors = require("cors");
const morgon = require("morgan");
const connect = require("./database/conn");

/** Routes Import */
const router = require("./router/route");

const app = express();
const port = 5000;

/** calling buitin middlewares */
app.use(express.json());
app.use(cors());
app.use(morgon("tiny"));
app.disable("x-powered-by"); // less hacked know about your stack

/** API routes */
app.use("/api", router);

/** http requests */
app.get("/", (req, res) => {
  res.status(200).json({
    message: "entry level api",
  });
});

/** start server when only connected to database */
app.listen(port, () => {
  console.log(`server running on port: ${port}📡`);
  connect();
});
