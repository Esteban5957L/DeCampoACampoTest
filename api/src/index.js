const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
require("dotenv").config();
const productRoutes = require("./routes/product");

const app = express();
const port = process.env.PORT || 3001;

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use('/',productRoutes);

// mongodb conection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connect to Mongo"))
  .catch((error) =>console.log(error));

app.listen(port, () => console.log("listening on port " + port));
