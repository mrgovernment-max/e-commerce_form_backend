const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "sql8.freesqldatabase.com",
  user: "sql8791620",
  password: "1snZQ7T8le",
  database: "sql8791620",
});

db.connect((err) => {
  if (err) console.log("unable to connect to database: ", err);
  console.log("Database Connected Successfully");
});

//define routes

app.post("/send", (req, res) => {
  const { name, email, subject, message } = req.body;
  const sql =
    "INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?)";
  const values = [name, email, subject, message];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("DB insert error:", err); // Add this to log error details
      return res.status(500).send("Internal Server Error");
    }
    res.send("Message sent");
  });
});

const port = process.env.PORT || 3000; // ✅ Fixed from 3306
app.listen(port, () => console.log(`Server running on port ${port}`));
