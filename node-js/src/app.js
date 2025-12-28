require("dotenv").config();

const express = require("express");
const userRoutes = require("./routes/user.routes");
const app = express();

const data = {
  message: "Hello, this is the first Node app i created! 28/12/2025",
  status: "ok",
};

//health check
app.use(express.json());
app.get("/", (req, res) => {
  res.writeHead(200, {
      "Content-Type": "application/json",
  });

  res.end(JSON.stringify(data));
});

//APIs
app.use("/users", userRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
