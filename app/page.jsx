import Login from "./components/login/Login";

export default function Home() {
  // const mudaFundo = () => {

  // }
  // let fundos = []
  // for (let i = 0; i <= 6; i++) {
  //   const add = 'lagoa' + i
  //   fundos.push(add)
  // }
  // console.log(fundos)
  const fundos = ['lagoa0', 'lagoa1', 'lagoa2', 'lagoa3', 'lagoa4', 'lagoa5', 'lagoa6']
  const lagoa = Math.floor(Math.random() * fundos.length)
  // onClick={() => mudaFundo()}

  return (
    <div >
      <div className={`${fundos[lagoa]} h-screen font-sans  bg-cover`} id="login">
        <Login />
        {/* <div>
          <button className="px-4 py-0 text-black font-light tracking-wider bg-cyan-300 hover:bg-cyan-50 rounded"
            >Ver Imagem Fundo</button>
        </div> */}
        {/* <div className="btnTroca">
          <button className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded"
          >Alterar Imagem</button>
        </div> */}
      </div>

    </div>
  );
}
