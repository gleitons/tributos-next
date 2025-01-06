'use client'
import ConditionalRender from './functions/ConditionalRender';
import { usePathname } from 'next/navigation';
import { checkIsPrivate } from './functions/check-is-private/index'
import  { GoogleAnalytics } from '@next/third-parties/google'


const metadata = {
  title: "Sistema - Setor de Tributos - Lagoa dos Patos MG",
  description: "Tributos - Lagoa dos Patos MG",
};

export default function LayoutDashboad({ children }) {

  const pathname = usePathname();
  const isPrivatePage = checkIsPrivate(pathname)

  

  return (
    <html lang="pt-BR">
      <body >       
          <ConditionalRender conditionFunction={isPrivatePage}>
            {children}
            <GoogleAnalytics gaId="G-EKP341VD46" />
          </ConditionalRender>
          <GoogleAnalytics gaId="G-EKP341VD46" />
       
      </body>
    </html>
  );
}
