import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";

const Home = () => {
  const [selectedOwner, setSelectedOwner] = useState("");
  const navigate = useNavigate();

  const ownerOptions = ["Godolphin", "Coolmore", "Darley"];

  const handleOwnerChange = (event) => {
    setSelectedOwner(event.target.value);
  };

  const handleButtonClick = () => {
    if (selectedOwner === "Godolphin") {
      navigate("/owners/godolphin");
    } else {
      alert('Please select "Godolphin" from the dropdown.');
    }
  };

  return (
    <div className="centered-container">
      <div className="home-container">
        <h1>Owners List</h1>
        <select value={selectedOwner} onChange={handleOwnerChange}>
          <option value="">Select an Owner</option>
          {ownerOptions.map((owner, index) => (
            <option key={index} value={owner}>
              {owner}
            </option>
          ))}
        </select>
        <button onClick={handleButtonClick}>Submit</button>
        {selectedOwner && <p>You selected: {selectedOwner}</p>}
      </div>
    </div>
  );
};

export default Home;
