'use client';

import FormularioDados from '../FormularioDados';

export default function EditarDadosClient({ initialData }) {
    return <FormularioDados initialData={initialData} isEditing={true} />;
}
