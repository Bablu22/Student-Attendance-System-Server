const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const connectDB = require("./db");
const routes = require("./routes/index");
const authenticate = require("./middleware/authenticate");
const dotenv = require("dotenv");
dotenv.config();

app.use(routes);

app.get("/private", authenticate, async (req, res) => {
  console.log("I am authenticated", req.user);
  return res.status(200).json({ message: "I am a private route" });
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

// Global error handle
app.use((err, _req, res, _next) => {
  const message = err.message ? err.message : "Server Error Occured";
  res.status(500).json({ message: message });
});

// connect mongoose

connectDB(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tzt34uk.mongodb.net/attendance-system`
)
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log("Server is running");
    });
  })
  .catch((e) => {
    console.log(e);
  });
