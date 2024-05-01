import Login from "./components/login/Login";

export default function Home() {
 
  return (
    <div >
      <div className={`lagoa h-screen font-sans  bg-cover`} id="login">
        <Login />
        {/* <div>
          <button className="px-4 py-0 text-black font-light tracking-wider bg-cyan-300 hover:bg-cyan-50 rounded"
            >Ver Imagem Fundo</button>
        </div> */}
      </div>

    </div>
  );
}
