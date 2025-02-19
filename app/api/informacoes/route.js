import { NextResponse } from "next/server";

export async function GET() {
    try {
        const timestamp = new Date().getTime(); // Garante que a URL é sempre única para evitar cache
        const url = `https://script.google.com/macros/s/AKfycbyRLJDq96sQFDca8ZWKH1I4NVEMdUUwRDdpoSJHzy9AT9C2N1M4b_7n1R4H0iKmTsv4JA/exec?nocache=${timestamp}`;
        
        const resp = await fetch(url, {
            cache: "no-store",
            next: { revalidate: 0 },
            headers: { 
                "Cache-Control": "no-cache, no-store, must-revalidate",
                "Pragma": "no-cache",
                "Expires": "0"
            }
        });

        if (!resp.ok) throw new Error("Erro ao buscar dados");

        const data = await resp.json();
        console.log("Dados recebidos:", data);

        return NextResponse.json(data);
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        return NextResponse.json({ error: "Falha ao buscar dados" }, { status: 500 });
    }
}
