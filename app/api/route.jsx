export async function GET() { 
    
    const toke = 'Jed6355DE'
   
    const validador = process.env.DRIPER
    if (toke == validador) {
       
        const data = await fetch('https://script.google.com/macros/s/AKfycbz7ErSj70haP8AkH2TiciA3BkY2vJhdek0fYPp0N_vtjyGZn4ziey1e08kB3tHH_fTUyA/exec')
        const contratos = await data.json()
        const ArrayCon = contratos.saida
        const novoContrato = []
        for(let i = 0; i  < ArrayCon.length; i ++){
            const newContrato ={
                dataCadastro : ArrayCon[i].dataCadastro,
                codigo: ArrayCon[i].codigo,
                criado: ArrayCon[i].criado
            }
            novoContrato.push(newContrato)
            
        }

        return Response.json(novoContrato)
    } else {
        // router.push('/')
    }


};
