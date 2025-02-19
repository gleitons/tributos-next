import { NextResponse } from "next/server";


export async function POST() {
    try {
        const url = 'https://script.google.com/macros/s/AKfycbwLdkjCEZAbCoFaWX7sfqjUSk3UL-hGdj0suHhtKRC1k1GBdsV7gyIISyQvyz9IpI63UA/exec';
        const resp = await fetch(url);
        const data = await resp.json();
        console.log(data)
        return NextResponse.json(data);      
    } catch (error) {
        console.Console(error)
    }



}