// import express from "express";
// import bodyParser from "body-parser";
// import axios from "axios";

// const app = express();
// const port = 3000;

// app.get("/get-cat-fact", async (req, res) => {
//   try {
//     // We call the external API here
//     const response = await axios.get("https://cat-fact.herokuapp.com/facts/random", {
//       params: {
//         animal_type: "cat",
//         amount: 1
//       }
//     });

//     // Because amount=1, response.data is an OBJECT.
//     // We access the 'text' property defined in the docs.
//     const factText = response.data.text;

//     console.log(factText);
async function getRandomEvent(month, day) {
  const url = `https://byabbe.se/on-this-day/${month}/${day}/events.json`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // 1. Access the events array
    const events = data.events;

    // 2. Pick a random index based on the list length
    const randomIndex = Math.floor(Math.random() * events.length);

    // 3. Select that specific event
    const randomEvent = events[randomIndex];

    // 4. Print the date and the specific event details
    console.log(`On ${data.date}, in the year ${randomEvent.year}:`);
    console.log(randomEvent.description);
  } catch (error) {
    console.error("Error fetching or processing data:", error);
  }
}

getRandomEvent(2, 5);
