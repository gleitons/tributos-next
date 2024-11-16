'use client'
import { useState } from "react"

export default function ServidorCompleto({servidor, onSave}) {
    const [form, setForm] = useState({
        nome: servidor?.nome || '',
        cargo: servidor?.nome || '',

    })
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm({...form, [name]: value});

        console.log(form)

    }

    return (
        <div>
            <form className='max-w-md mx-auto'>
                <input className='w-full p-2 border rounded ' name="nome" type="text" onChange={handleChange} value={form.nome} placeholder="Nome" />
                <input className='w-full p-2 border rounded ' name="cargo" type="text" onChange={handleChange} value={form.cargo}  placeholder="Cargo" />

                <button className="w-full p-2 bg-blue-500 text-white rounded" type='POST'>Cadastrar Servidor</button>
            </form>

            {form.nome}
        </div>
    )
};
