import { useState, useEffect } from "react";
import Navbar from "../component/Navbar";
import axios from "axios";
import "../assets/css/home.css";

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/note");
        if (res.data.success) {
          setData(res.data.result);
        } else {
          console.log(res.data.message);
        }
      } catch (error) {
        console.error("Fetch error:", error.response?.data?.message || error.message);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="note_field">
  
      {data.length > 0 ? (
  data.map((note) => (
    <div className="card" key={note._id}>
      <h2>{note.title}</h2>
      <hr></hr>
      <h4>{note.content}</h4>
      <h6>{new Date(note.date).toLocaleDateString()}</h6>
      <hr></hr>
      <button className="btn btn-danger">Delete</button>
    </div>
  ))
) : (
  <p>No Note Found</p>
)}
</div>
      </div>

  );
}

export default Home;
