import React, { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./feature.css";
import { useTheme } from "../ThemeContext";

function Dashboard() {
  const [file, setFile] = useState(null);
  const [date, setDate] = useState(new Date());
  const [shipments, setShipments] = useState([]);
  const { darkMode } = useTheme();
  const appBarStyle = {
    backgroundColor: darkMode ? "#333" : "#FFF",
    color: darkMode ? "#FFF" : "#333",
  };

  useEffect(() => {
    fetchShipments(date);
  }, [date]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post("/upload", formData)
      .then((response) => {
        console.log(response.data);
        fetchShipments(date);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchShipments = (date) => {
    const dateString = date.toLocaleDateString("en-CA");
    axios
      .get(`shipments?date=${dateString}`)
      .then((response) => {
        setShipments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching shipments:", error);
      });
  };

  return (
    <div className="fullPageStylesDashboard" style={appBarStyle}>
      <div>
        <h1>Dashboard</h1>
        <form onSubmit={handleFileUpload}>
          <input type="file" onChange={handleFileChange} />
          <button type="submit">Upload</button>
        </form>
        <div>
          <h2>Calendar Viewer</h2>
          <Calendar onChange={setDate} value={date} />
        </div>
      </div>
      <div className="shipment">
        {shipments.map((shipment, index) => (
          <div key={index}>
            <h3>Shipment {index + 1}</h3>
            <p>From: {shipment.from}</p>
            <p>To: {shipment.to}</p>
            <p>Weight: {shipment.weight} kg</p>
            <p>Date: {shipment.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
