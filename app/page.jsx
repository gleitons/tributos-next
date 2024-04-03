'use client'
import { useState } from "react";
import Login from "./components/login/Login";

export default function Home() {
  
  const [lagoaS, setLagoa] = useState('lagoa h-screen font-sans  bg-cover')

  setTimeout(() => {
    setLagoa('lagoa2 h-screen font-sans  bg-cover')
  }, 1000);



  return (
    <div >
      <div className={lagoaS} id="login">
      <Login />
      </div>

    </div>
  );
}
