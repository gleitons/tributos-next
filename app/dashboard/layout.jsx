'use client'
import ConditionalRender from './functions/ConditionalRender';
import { usePathname } from 'next/navigation';
import { checkIsPrivate } from './functions/check-is-private/index'

const metadata = {
  title: "Sistema - Setor de Tributos - Lagoa dos Patos MG",
  description: "Tributos - Lagoa dos Patos MG",
};

export default function LayoutDashboad({ children }) {

  const pathname = usePathname();
  const isPrivatePage = checkIsPrivate(pathname)

  console.log(isPrivatePage + ' rota privada')

  return (
    <html lang="pt-BR">
      <body >       
          <ConditionalRender conditionFunction={isPrivatePage}>
            {children}
          </ConditionalRender>
       
      </body>
    </html>
  );
}
