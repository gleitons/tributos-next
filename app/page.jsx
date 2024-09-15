import Login from "./components/login/Login";

export default function Home() {
  
  let fundos = []

  for (let i = 0; i <= 6; i++) {
    let add = 'lagoa' + i
    fundos.push(add)
  }
 
  // const fundos = ['lagoa0', 'lagoa1', 'lagoa2', 'lagoa3', 'lagoa4', 'lagoa5', 'lagoa6']
  let lagoa = Math.floor(Math.random() * fundos.length)
 

  return (
    <div >
      <div className={`${fundos[2]} h-screen font-sans  bg-cover`} id="login">
        
       
      <Login />
      </div>

    </div>
  );
}
