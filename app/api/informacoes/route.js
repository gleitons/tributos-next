import { NextResponse } from "next/server"; 

export async function POST(req) {
    const fetchDados = async () => {
        const url = 'https://script.googleusercontent.com/macros/echo?user_content_key=b6FGlRkOtJlxCL3PQq1wg9F0zU_CVx2JKmfR25wTNM2a_WLL_Ib0iyZd1RUKv-ikjZW0wXjggLdIgow_zqEzkfszZlg4EsV6m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnAa4bOIxoqN3xPCBqntyz7efbJwmCxgq8QJE2IFItoyNlkUBwJzQaGBab8c6zPtCCcXHj6vDvUAOE6dIlmKlUSpz9yo2wgq4vdz9Jw9Md8uu&lib=MLDsGyJD7jLXh6mBwgLGLcuGfX2Rz_hMQ';
        const resp = await fetch(url, {next: {revalidate: 600}});
        const data = await resp.json();
        return data.saida;
    }
    const osDados = await fetchDados();
    return NextResponse.json({osDados});
   
}