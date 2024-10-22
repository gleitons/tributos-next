import { NextResponse } from "next/server"; 

export async function POST(req) {
    const data = await req.json();
    const url = 'https://dapper-panda-e60101.netlify.app/verifica-login.html'
    const resp = await data;
    console.log(resp.adress)
    if(resp.adress === '1') {
        return NextResponse.json(url)
    } 

    
}