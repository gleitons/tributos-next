import MenuLateral from "../components/menus/MenuLateral";
export const metadata = {
  title: "Setor de Tributos - Lagoa dos Patos MG",
  description: "Tributos - Lagoa dos Patos MG",
};

export default function LayoutDashboad({ children }) {
  
  return (
    <html lang="pt-BR">
      <body className="flex">
        <div>
            <MenuLateral />
        </div>
        <div>
        {children}
        </div>
        </body>
    </html>
  );
}
