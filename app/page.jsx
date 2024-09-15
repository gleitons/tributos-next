import Login from "./components/login/Login";

export default function Home() {
  let fundos = []
  for(let i = 0; i <= 6; i ++){
    const add = 'lagoa' + i
    fundos.push(add)
  }
  console.log(fundos)
  // const fundos = ['lagoa', 'lagoa1']
  const lagoa = Math.floor(Math.random() * fundos.length)
 

  return (
    <div >
      <div className={`${fundos[lagoa]} h-screen font-sans  bg-cover`} id="login">
        <Login />
        {/* <div>
          <button className="px-4 py-0 text-black font-light tracking-wider bg-cyan-300 hover:bg-cyan-50 rounded"
            >Ver Imagem Fundo</button>
        </div> */}
      </div>

    </div>
  );
}
