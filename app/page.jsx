import Login from "./components/login/Login";


export default function Home() {
  
  return (
    <div >
      
      <div className={`lagoa8 h-screen font-sans  bg-cover`} id="login">   
      
        <div className="w-full h-screen bgEscuro">
        <Login />
      
        </div>   
      
      </div>

    </div>
  );
}
