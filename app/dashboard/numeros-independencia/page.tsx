import { getNumeros } from './actions'
import NumerosClient from './NumerosClient'

export const dynamic = 'force-dynamic'

export default async function NumerosIndependenciaPage() {
    const res = await getNumeros()
    const initialData = res.success ? res.data : []

    return (
        <NumerosClient initialData={initialData as any} />
    )
}
