
import "./globals.css";


export const metadata = {
  title: "Setor de Tributos - Lagoa dos Patos MG",
  description: "Tributos - Lagoa dos Patos MG",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
