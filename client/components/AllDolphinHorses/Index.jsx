import React, { useState, useEffect } from "react";
import parse from "html-react-parser";
import "./index.scss";

function AllDolphinHorses() {
  const [data, setData] = useState("");

  useEffect(() => {
    // Make a GET request to your Express server
    fetch("http://localhost:3001/api/fetchHorses")
      .then((response) => response.text())
      .then((htmlContent) => {
        // Update the state with the fetched HTML data
        setData(htmlContent);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="content-container">
      <h1 className="page-title">Dolphin Horses</h1>
      <div className="scrollable-content">{parse(data)}</div>
    </div>
  );
}

export default AllDolphinHorses;
