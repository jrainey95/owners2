// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

// function HorseProfile() {
//   const { horseName } = useParams();
//   const [horseData, setHorseData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`/api/horses/${horseName}`);
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const htmlContent = await response.text(); // Use text() to fetch HTML content

//         // Set the HTML content directly in the state
//         setHorseData(htmlContent);
//       } catch (error) {
//         console.error("Error fetching horse data:", error);
//       }
//     };

//     fetchData();
//   }, [horseName]);

//   if (!horseData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h2>{horseName} Profile</h2>
//       <h2>{horseData.age} Profile</h2>
//     </div>
//   );
// }

// export default HorseProfile;


// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

// function HorseProfile() {
//   const { horseName } = useParams();
//   const [horseData, setHorseData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`/api/horses/${horseName}`);
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const htmlContent = await response.text(); // Use text() to fetch HTML content

//         // Set the HTML content directly in the state
//         setHorseData(htmlContent);
//       } catch (error) {
//         console.error("Error fetching horse data:", error);
//       }
//     };

//     fetchData();
//   }, [horseName]);

//   if (!horseData) {
//     return <div>Loading...</div>;
//   }




//   return (
//     <div>
//       <h2>{horseData.name} Profile</h2>
//       <div>
//         <p>Age: {horseData.age}</p>
//         <p>Gender: {horseData.gender}</p>
//         <p>Sire: {horseData.sire}</p>
//         <p>Dam: {horseData.dam}</p>
//         <p>Trainer: {horseData.trainer}</p>
//         <p>Country: {horseData.country}</p>
//       </div>
//     </div>
//   );
// }

// export default HorseProfile;



import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function HorseProfile() {
  const { horseName } = useParams();
  const [horseData, setHorseData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/horses/${horseName}`);
        if (!response.ok) {
          throw new Error(
            `Network response was not ok (status: ${response.status})`
          );
        }
        const data = await response.json();

        // Check if the response is valid JSON
        if (typeof data !== "object") {
          throw new Error(`Invalid JSON response: ${JSON.stringify(data)}`);
        }

        setHorseData(data);
      } catch (error) {
        console.error("Error fetching horse data:", error);
      }
    };

    fetchData();
  }, [horseName]);

  if (!horseData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{horseData.name} Profile</h2>
      <div>
        <p>Age: {horseData.age}</p>
        <p>Gender: {horseData.gender}</p>
        <p>Sire: {horseData.sire}</p>
        <p>Dam: {horseData.dam}</p>
        <p>Trainer: {horseData.trainer}</p>
        <p>Country: {horseData.country}</p>
      </div>
    </div>
  );
}

export default HorseProfile;
