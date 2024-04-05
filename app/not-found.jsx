import BotaoAutentica from "./components/botoes/BotaoAutentica"
import Validador from "./validador/page"
export default function NotFound() {

    return (
        <>        
        <div className="text-center w-full p-10">
            <h3>Selecione a Opção</h3>
            <BotaoAutentica />
            <div className="invisible">
            <Validador />
            </div>
        </div>
        </>
    )
}