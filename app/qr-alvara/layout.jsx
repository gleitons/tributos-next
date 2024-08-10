export const metadata = {
    title: 'Leis Municipais em Lagoa dos Patos MG',
    description: 'Esta é a descrição da minha página',
    keywords: ['nextjs', 'react', 'exemplo', 'SEO'],
};

export default function RootLayout({ children }) {
    return (
        <html lang="pt-BR">
            <body>{children}</body>
        </html>
    );
}
