'use server';

import { getPeople } from '@/app/actions/people';
import { getProperties } from '@/app/actions/properties';
import ItbiForm from './ItbiForm';

export default async function NovoItbiPage() {
    const people = await getPeople();
    const properties = await getProperties();

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Gerar Novo ITBI</h1>
            <ItbiForm people={people} properties={properties} />
        </div>
    );
}
