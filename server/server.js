const express = require("express");
const path = require("path");
// Import the ApolloServer class
const axios = require("axios");
const cors = require("cors");
const cheerio = require("cheerio");
const router = express.Router();
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { authMiddleware } = require("./utils/auth");
const Horse = require("./models/Horse");

// Import the two parts of a GraphQL schema
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();

app.use(cors());

app.get("/api/fetchHorses", async (req, res) => {
  try {
    const horseResponse = await axios.get(
      "https://www.godolphin.com/horses/in-training"
    );
    const html = await horseResponse.data;

    const $ = cheerio.load(html);

    // Select the main content element
    const mainContent = $(".main-content");

    // Select all the <a> elements within the main content
    const aElements = mainContent.find("a");

    if (aElements.length > 0) {
      // Send the HTML of the selected <a> elements as the response
      res.send(aElements.html());
    } else {
      res
        .status(404)
        .json({ error: "No <a> elements found within the main content" });
    }
  } catch (error) {
    console.error("Error fetching horse data:", error);
    res.status(500).json({ error: "Unable to fetch horse data" });
  }
});




// the fetch  that works// 


// app.get("/api/fetchHorses", async (req, res) => {
//   try {
//     const horseResponse = await axios.get(
//       "https://www.godolphin.com/horses/in-training"
//     );
//     const html2 = await horseResponse.data;

//     const $$ = cheerio.load(html2);

//     // Extract the content of the specific div with the given ID
//     const horseContent = $$(".main-content").html();

//     if (horseContent) {
//       // Send the content of the specific div as the response
//       // res.send(horseContent);
//       res.send(html2);
//     } else {
//       res.status(404).json({ error: "Horse content not found" });
//     }
//   } catch (error) {
//     console.error("Error fetching horse data:", error);
//     res.status(500).json({ error: "Unable to fetch horse data" });
//   }
// });





// Sample that works// 

// app.get("/api/fetchHorses", async (req, res) => {
//   try {
//     // Step 1: Fetch horse data from a website
//     const horseResponse = await axios.get(
//       "https://www.godolphin.com/horses/in-training"
//     );
//     const html2 = await horseResponse.data;

//     // Step 2: Load the HTML content using Cheerio
//     const $$ = cheerio.load(html2);

//     // Step 3: Extract the content of the specific div with the given ID
//     const horseContent = $$(".view-content").html();

//     if (horseContent) {
//       // Step 4: If horse content is found, create a new Horse document
//       const newHorse = new Horse({
//         // Customize these fields based on your scraped data
//         horseName: "Sample Horse Name",
//         age: 3,
//         gender: "Colt",
//         sire: "Sample Sire",
//         dam: "Sample Dam",
//         trainer: "Sample Trainer",
//         country: "Sample Country",
//       });

//       // Step 5: Save the horse data to MongoDB
//       await newHorse.save();

//       // Step 6: Respond with a success message
//       res.status(200).json({ message: "Horse data saved to MongoDB" });
//     } else {
//       // If horse content is not found, respond with an error
//       res.status(404).json({ error: "Horse content not found" });
//     }
//   } catch (error) {
//     // Handle any errors that occur during the process
//     console.error("Error fetching and saving horse data:", error);
//     res.status(500).json({ error: "Unable to fetch and save horse data" });
//   }
// });




//working on it 
app.get("/api/fetchAndSaveHorses", async (req, res) => {
  try {
    // Step 1: Fetch horse data from a website
    const horseResponse = await axios.get(
      "https://www.godolphin.com/horses/in-training"
    );
    const html = horseResponse.data;

    // Step 2: Load the HTML content using Cheerio
    const $ = cheerio.load(html);

    // Step 3: Extract and structure the horse data
    const horses = [];
    $(".even, .odd").each((index, element) => {
      const $horseInfo = $(element);

      const name = $horseInfo.find(".views-field-title a").text().trim();
      const age = $horseInfo
        .find(".views-field-field-horse-deceased")
        .text()
        .trim();
      const gender = $horseInfo
        .find(".views-field-field-horse-gender")
        .text()
        .trim();
      const sire = $horseInfo
        .find(".views-field-field-horse-sire")
        .text()
        .trim();
      const dam = $horseInfo.find(".views-field-field-horse-dam").text().trim();
      const trainer = $horseInfo
        .find(".views-field-field-trainer")
        .text()
        .trim();
      const country = $horseInfo
        .find(".views-field-field-country")
        .text()
        .trim();

      if (name) {
        // Ensure that the name is not empty
        horses.push({
          name,
          age,
          gender,
          sire,
          dam,
          trainer,
          country,
        });
      }
    });

    // Step 4: Save the horse data to MongoDB
    const savedHorses = await Promise.all(
      horses.map((horse) => Horse.create(horse))
    );

    // Step 5: Respond with a success message and the saved data
    res
      .status(200)
      .json({ message: "Horse data saved to MongoDB", savedHorses });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error fetching and saving horse data:", error);
    res.status(500).json({ error: "Unable to fetch and save horse data" });
  }
});

router.get("/api/horses/:horseName", async (req, res) => {
  try {
    const horseName = req.params.horseName;
    const horse = await Horse.findOne({ name: horseName });

    if (!horse) {
      return res.status(404).json({ error: "Horse not found" });
    }

    res.json(horse);
  } catch (error) {
    console.error("Error fetching horse data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: authMiddleware,
    })
  );

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Call the async function to start the server
startApolloServer();


