
import "./globals.css";
import  { GoogleAnalytics } from '@next/third-parties/google';


export const metadata = {
  title: "Setor de Tributos - Lagoa dos Patos MG",
  description: "Tributos - Lagoa dos Patos MG",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body >{children}</body>
      <GoogleAnalytics gaId="G-EKP341VD46" />
    </html>
  );
}
