
// import { useState } from "react";
import Login from "./components/login/Login";

export default function Home() {
  
  // const [lagoaS, setLagoa] = useState('lagoa')

  // setTimeout(() => {
  //   setLagoa('lagoa2')
  // }, 3000);



  return (
    <div >
      <div className="lagoa h-screen font-sans  bg-cover" id="login">
      <Login />
      </div>

    </div>
  );
}
