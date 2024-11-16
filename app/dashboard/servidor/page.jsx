'use client';
import { useState } from 'react';
// import ServidorCompleto from '@/app/dashboard/components/ServidorCompleto'
import NewVersionNotice from '@/app/dashboard/components/NewVersionNotice'


export default function Page() {
  return (
    <NewVersionNotice />
    // w-full p-2 border rounded
    //className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg space-y-4"
    // <div>
    //   <div>
    //     <h2>Cadastro Servidor</h2>
    //     <div>
    //       <ServidorCompleto />
    //       {/* <form action="POST" className='max-w-md mx-auto'>
    //         <input 
    //         type="text"
    //         className='w-full p-2 border rounded '
    //          />
    //         <input 
    //         type="text"
    //         className='w-full p-2 border rounded '
    //          />
    //         <button className="w-full p-2 bg-blue-500 text-white rounded" type='POST'>Cadastrar Servidor</button>
    //       </form> */}
    //     </div>
    //   </div>
    // </div>
  );

}
