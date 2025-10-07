import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import axios from "axios";

function Home() {
  const [user, setUser] = useState({ name: "" });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get("http://localhost:3000/api/view", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) {
          setUser(res.data.result); 
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);

  return <Navbar username={user.name} />;
}

export default Home;
