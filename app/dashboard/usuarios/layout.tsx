import Link from 'next/link';
import { menuUsuarios } from './menu';

export default function UsuariosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full">
      <aside className="w-64 bg-gray-100 border-r border-gray-200 p-4 hidden md:block">
        <nav className="space-y-1">
          {menuUsuarios.map((item) => (
            <Link
              key={item.titulo}
              href={`${item.link}`}
              className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-white hover:text-indigo-600 hover:shadow-sm transition-colors"
            >
              {item.titulo}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
}
