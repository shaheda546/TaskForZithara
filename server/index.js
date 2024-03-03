const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");


//middleware
app.use(cors());
app.use(express.json());


// Route
// get all records
app.get("/salesdb", async (req, res) => {
    try {
      const allCustomers = await pool.query("SELECT * FROM customers");
      res.json(allCustomers.rows);
    } catch (err) {
      console.error(err.message);
    }
  });




app.listen(5000, () => {
    console.log("server has started on port 5000");
  });