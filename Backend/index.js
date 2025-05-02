const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const rt = require("./routes/routes");
// const bcrypt = require("bcrypt")

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Connection error:", err));

const app = express();
const PORT = process.env.PORT;

app.use(express.json())
app.use(cors())
app.use("/",rt)

app.listen(PORT, () => {
  console.log(`App started on http://localhost:${PORT}`);
});
