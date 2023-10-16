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
    const html2 = await horseResponse.data;

    const $$ = cheerio.load(html2);

    // Extract the content of the specific div with the given ID
    const horseContent = $$(".main-content").html();

    if (horseContent) {
      // Send the content of the specific div as the response
      // res.send(horseContent);
      res.send(html2);
    } else {
      res.status(404).json({ error: "Horse content not found" });
    }
  } catch (error) {
    console.error("Error fetching horse data:", error);
    res.status(500).json({ error: "Unable to fetch horse data" });
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
