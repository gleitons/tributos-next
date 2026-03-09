import Link from "next/link";

export default function SolicitacaoPage() {
    return (
        <div>
            <h1>SOLCITACÕES</h1>

            <Link href="/solicitacao/itbi-urbano">ITBI Urbano</Link>
            <Link href="/solicitacao/itbi-rural">ITBI Rural</Link>
        </div>
    )
}