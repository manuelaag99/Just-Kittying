import express from "express";
import mysql from "mysql";

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "",
    password: "",
    database: ""
});

app.get("/", (req, res) => {
    res.json("this is back end")
})

app.listen(3300, (req, res) => {
    console.log("Your server is running on port 3000!")
});