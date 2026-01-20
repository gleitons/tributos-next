
import NewVersionNotice from './components/NewVersionNotice'
import { servicosIniciais } from '../actions/servicosIniciais'
import ServicosPage from '../components/ServicosPage'
export default function Dashboard() {
    const servicos = servicosIniciais;

    return (
        <>
        <h2>Acesso rápido</h2>
        <div>
            <ServicosPage servicos={servicos} />
        </div>
        <div className='w-full m-auto p-3'>
            <NewVersionNotice />

        </div>
        </>
    )
};
