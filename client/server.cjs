const express = require("express");
const axios = require("axios");
const cors = require("cors");
const cheerio = require("cheerio");

const app = express();
const port = process.env.PORT || 3002;

app.use(cors());

// Display selected data as a json //

// app.get("/api/fetchData", async (req, res) => {
//   try {
//     const axiosResponse = await axios.get(
//       "https://www.godolphin.com/runners-and-results/runners"
//     );
//     const html = await axiosResponse.data;

//     const $ = cheerio.load(html);
//     const data = []; // Create an array to store the parsed data

//     // Use Cheerio selectors to extract the data you need
//     $(".tabs-content").each((index, element) => {
//       // Remove line breaks from the HTML content
//       const itemHTML = $(element).html().replace(/\n/g, ""); // Remove line breaks
//       data.push(itemHTML); // Push the HTML content into the data array
//     });
//     console.log("HTML content:", data);
//     // res.send(html);
//     res.json(data); // Send the data array as JSON
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     res.status(500).json({ error: "Unable to fetch data" });
//   }
// });

// app.get("/api/fetchAndSaveHorses", async (req, res) => {
//   try {
//     // Step 1: Fetch horse data from a website
//     const horseResponse = await axios.get(
//       "https://www.godolphin.com/horses/in-training"
//     );
//     const html = horseResponse.data;

//     // Step 2: Load the HTML content using Cheerio
//     const $ = cheerio.load(html);

//     // Step 3: Extract and structure the horse data
//     const horses = [];
//     $(".even, .odd").each((index, element) => {
//       const $horseInfo = $(element);

//       const name = $horseInfo.find(".views-field-title a").text().trim();
//       const age = $horseInfo
//         .find(".views-field-field-horse-deceased")
//         .text()
//         .trim();
//       const gender = $horseInfo
//         .find(".views-field-field-horse-gender")
//         .text()
//         .trim();
//       const sire = $horseInfo
//         .find(".views-field-field-horse-sire")
//         .text()
//         .trim();
//       const dam = $horseInfo.find(".views-field-field-horse-dam").text().trim();
//       const trainer = $horseInfo
//         .find(".views-field-field-trainer")
//         .text()
//         .trim();
//       const country = $horseInfo
//         .find(".views-field-field-country")
//         .text()
//         .trim();

//       if (name) {
//         // Ensure that the name is not empty
//         horses.push({
//           name,
//           age,
//           gender,
//           sire,
//           dam,
//           trainer,
//           country,
//         });
//       }
//     });

//     // Step 4: Save the horse data to MongoDB
//     const savedHorses = await Promise.all(
//       horses.map((horse) => Horse.create(horse))
//     );

//     // Step 5: Respond with a success message and the saved data
//     res
//       .status(200)
//       .json({ message: "Horse data saved to MongoDB", savedHorses });
//   } catch (error) {
//     // Handle any errors that occur during the process
//     console.error("Error fetching and saving horse data:", error);
//     res.status(500).json({ error: "Unable to fetch and save horse data" });
//   }
// });


app.get("/api/fetchHorses", async (req, res) => {
  try {
    const horseResponse = await axios.get(
      "https://www.godolphin.com/horses/in-training"
    );
    const html2 = await horseResponse.data;

    const $$ = cheerio.load(html2);

    // Extract the content of the specific div with the given ID
    const horseContent = $$(".view-content").html();

    if (horseContent) {
      // Send the content of the specific div as the response
      // res.send(horseContent);
      res.send(horseContent);
    } else {
      res.status(404).json({ error: "Horse content not found" });
    }
  } catch (error) {
    console.error("Error fetching horse data:", error);
    res.status(500).json({ error: "Unable to fetch horse data" });
  }
});




// display data as html as seen on website// 

app.get("/api/fetchData", async (req, res) => {
  try {
    const axiosResponse = await axios.get(
      "https://www.godolphin.com/runners-and-results/runners"
    );
    const html = await axiosResponse.data;

    const $ = cheerio.load(html);

    // Extract the content of the specific div with the given ID
    const mainContent = $("#block-system-main").html();

    if (mainContent) {
      // Send the content of the specific div as the response
      // res.send(mainContent);
      res.send(mainContent);
    } else {
      res.status(404).json({ error: "Main content not found" });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Unable to fetch data" });
  }
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});