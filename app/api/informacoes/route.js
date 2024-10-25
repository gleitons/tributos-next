import { NextResponse } from "next/server"; 

    
export async function POST(req) {
    const fetchDados = async () => {
        const url = 'https://script.google.com/macros/s/AKfycbwLdkjCEZAbCoFaWX7sfqjUSk3UL-hGdj0suHhtKRC1k1GBdsV7gyIISyQvyz9IpI63UA/exec';
        const resp = await fetch(url, {next: {revalidate: 600}});
        const data = await resp.json();
       
        return data;
    }
    const osDados = await fetchDados();
    return NextResponse.json({osDados});
   
}