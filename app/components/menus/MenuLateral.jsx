'use client'
import { useState } from 'react';
import Link from 'next/link';
import { IoHome } from "react-icons/io5";
import { BsDatabaseFillLock } from "react-icons/bs";
import { FaCity } from "react-icons/fa6";
import { FaTools, FaHouseUser } from "react-icons/fa";
import { RiPercentFill } from "react-icons/ri";

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
        { nome: 'Mapa Urbano Lagoa', link: '/dashboard/mapa-completo-lagoa-dos-patos-mg' },
        { nome: 'Mapa Rural Lagoa', link: '/dashboard/mapa-rural-lagoa-dos-patos-mg' },
        { nome: 'Valor Terra nua', link: '/dashboard/valor-terra-nua' },



      ],
    },
    {
      portugues: 'Bairros',
      link: '',
      icone: <FaCity />,
      submenus: [
        { nome: 'Todos', link: '/dashboard/registros-imobiliarios' },
        { nome: 'Centro', link: '/dashboard/centro' },
        { nome: 'Cidade Nova', link: '/dashboard/cidade-nova' },
        { nome: 'Cidade Nova II', link: '/dashboard/cidade-nova-ii' },
        { nome: 'Independencia', link: '/dashboard/independencia' },
        { nome: 'Novo Horizonte', link: '/dashboard/novo-horizonte' },
        { nome: 'Santo Andre', link: '/dashboard/santo-andre' },
        { nome: 'Vila Branca', link: '/dashboard/vila-branca' },


      ],
    },
    {
      portugues: 'Ferramentas',
      link: '',
      icone: <FaTools />,
      submenus: [
        { nome: 'Calculadora ISSQN', link: '/dashboard/calculadora-issqn' },
        { nome: 'Retira Caracteres', link: '/dashboard/retira-caracteres' },
        { nome: 'Documentos para CNPJ', link: '/dashboard/documentos-cnpj' },



      ],
    },
    {
      portugues: 'ITBI',
      link: '',
      icone: <FaHouseUser />,
      submenus: [
        { nome: 'ITBI Rural', link: '/dashboard/itbi-rural' },
        { nome: 'ITBI  Urbano', link: '/dashboard/itbi-urbano' },



      ],
    },
    {
      portugues: 'Avaliação Venal',
      link: '',
      icone: <RiPercentFill />,
      submenus: [
        { nome: 'Avaliação Rural', link: '/dashboard/avaliacao-venal-rural' },
        { nome: 'Avaliação Urbano', link: '/dashboard/avaliacao-venal-urbano' },



      ],
    },
    {
      portugues: 'Alvarás',
      link: '',
      icone: <RiPercentFill />,
      submenus: [
        { nome: 'Alvará Cemitério', link: '/dashboard/alvara-cemiterio' },
        { nome: 'Alvará de Construção', link: '/dashboard/' },



      ],
    },
    {
      portugues: 'Projetos',
      link: '',
      icone: <BsDatabaseFillLock />,
      submenus: [
        { nome: 'Nome de Ruas', link: '/dashboard/nome-de-ruas' },
        { nome: 'Valores IPTU', link: '/dashboard/valores-iptu' },


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
