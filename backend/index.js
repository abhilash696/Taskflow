const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const Errorhandler = require("./Middlewares/errorHandler");
const cors = require("cors");

const authRouter = require("./Routes/Auth");
const taskRouter = require("./Routes/Tasks");

const app = express();
app.use(cors());

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("database connection succesfull"))
  .catch((err) => console.log(err));

//setting up routers in app.js
app.use("/api/auth", authRouter);
app.use("/api/tasks", taskRouter);

//add error handling middleware at last
app.use(Errorhandler);

app.listen(5000, () => {
  console.log("app running on port 5000");
});
