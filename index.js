import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
app.use(express.urlencoded({ extended: true }));

const port = 3000;

app.get("/", (req, res) => {
  res.render("index.ejs", { fact: null });
});

app.post("/submit", async (req, res) => {
  const month = req.body.month;
  const day = req.body.day;

  try {
    const response = await axios.get(
      `https://byabbe.se/on-this-day/${month}/${day}/events.json`
    );

    const events = response.data.events;
    const randomIndex = Math.floor(Math.random() * events.length);
    const randomEvent = events[randomIndex];
    res.render("index.ejs", {
      fact: randomEvent.description, 
      date: response.data.date,
      year: randomEvent.year, 
    });
  } catch (error) {
    console.error("Error fetching or processing data:", error);
    res.render("index.ejs", {
      fact: "Sorry, we couldn't find a fact for that date.",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
