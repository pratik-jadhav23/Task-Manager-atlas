const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const rt = require("./routes/routes");
// const bcrypt = require("bcrypt")

dotenv.config();

// Use MONGODB_URI from environment
const uri = process.env.MONGO_URI;
if (!uri) {
  console.error('MONGODB_URI not set — app will fail to connect to DB.');
}

mongoose
  .connect(uri, { 
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Connection error:", err));

const app = express();
const PORT = process.env.PORT || 5001; 

app.use(express.json())
app.use(cors()) 
app.use("/",rt)
 
app.listen(PORT, () => { 
  console.log(`App started on http://localhost:${PORT}`);
});
