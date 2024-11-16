'use client'
import { useState } from 'react';
import Link from 'next/link';
import { IoHome } from "react-icons/io5";
import { BsDatabaseFillLock } from "react-icons/bs";

const MenuLateral = () => {
  const [openMenu, setOpenMenu] = useState(null);

  const menus = [
    {
      portugues: 'Inicio',
      link: '/dashboard',
      icone: <IoHome />,
      submenus: [


      ],
    },
    {
      portugues: 'Dados',
      link: '',
      icone: <BsDatabaseFillLock />,
      submenus: [
        { nome: 'Dados Contribuites', link: '/dashboard/dados' },
        { nome: 'Registros Imobiliarios', link: '/dashboard/registros-imobiliarios' },
        { nome: 'Mapa Completo Lagoa', link: '/dashboard/mapa-completo-lagoa-dos-patos-mg' },
        { nome: 'Valor Terra nua', link: '/dashboard/valor-terra-nua' },



      ],
    },
    {
      portugues: 'Bairros',
      link: '',
      icone: <BsDatabaseFillLock />,
      submenus: [
        { nome: 'Todos', link: '/dashboard/registros-imobiliarios' },
        { nome: 'Centro', link: '/dashboard/centro' },
        { nome: 'Cidade Nova', link: '/dashboard/cidade-nova' },
        { nome: 'Cidade Nova II', link: '/dashboard/cidade-nova-ii' },
        { nome: 'Independencia', link: '/dashboard/independencia' },
        { nome: 'Novo Horizonte', link: '/dashboard/novo-horizonte' },
        { nome: 'Santo Andre', link: '/dashboard/santo-andre' },


      ],
    },
    {
      portugues: 'Ferramentas',
      link: '',
      icone: <BsDatabaseFillLock />,
      submenus: [
        { nome: 'Calculadora ISSQN', link: '/dashboard/calculadora-issqn' },
        { nome: 'Retira Caracteres', link: '/dashboard/retira-caracteres' },
       


      ],
    },
    {
      portugues: 'ITBI',
      link: '',
      icone: <BsDatabaseFillLock />,
      submenus: [
        { nome: 'ITBI Rural', link: '/dashboard/itbi-rural' },
        { nome: 'ITBI  Urbano', link: '/dashboard/itbi-urbano' },
       


      ],
    },
    {
      portugues: 'Configurações',
      link: '',
      icone: <BsDatabaseFillLock />,
      submenus: [
        { nome: 'UFM', link: '/dashboard/configuracoes' },
        { nome: 'Servidores', link: '/dashboard/servidor' },
       

      ],
      
    }
  ];

  const toggleMenu = (index) => {
    setOpenMenu(openMenu === index ? null : index);
  };

  return (
    <div className='w-[200px] bg-gray-700 h-screen'>
      <nav>
        <ul className='text-white'>
          {menus.map((menu, index) => (
            <Link href={menu.link} key={menu.portugues}>
              <button
                onClick={() => toggleMenu(index)}
                className='w-full flex items-center gap-2 text-left px-4 py-2 hover:bg-gray-600 focus:outline-none'
              >
                {menu.icone}{menu.portugues}
              </button>
              {openMenu === index && (
                <ul className='pl-4 bg-gray-600'>
                  {menu.submenus.map((submenu) => (
                    <li key={submenu.nome} className='py-1 shadow-xl hover:bg-gray-500'>
                      <Link href={submenu.link}>
                        <div className='hover:underline'>{submenu.nome}</div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </Link>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default MenuLateral;
