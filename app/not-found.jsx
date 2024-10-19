import BotaoAutentica from "./components/botoes/BotaoAutentica"
import Image from "next/image"
import Validador from "./validador/page"
export default function NotFound() {

    return (
        <>        
        <div className="text-center w-full p-10">
            <h3>Selecione a Opção</h3>
            <BotaoAutentica />
            <div className="invisible">
            <Image src="/img/aviso-importante.jpeg" width={360} height={150} alt="Insira um numero"/>
            <Validador />
            </div>
        </div>
        </>
    )
}