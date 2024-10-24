// Exportação padrão da função Fetchapi
export default async function Fetchapi() {
    // Outras operações, se necessário
}

// Exportando as funções `pega` e `mostra` individualmente
export async function pega({ endereco }) {
    try {
        const response = await fetch(`/api/${endereco}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Corrigido aqui
            },
            body: JSON.stringify({})
        });


        const dadosEmpresas = await response.json();


        const dados = dadosEmpresas.osDados


        dados.sort((a, b) => {           
            return a.empresa.localeCompare(b.empresa);
        });       

        return dados;

    } catch (error) {
        return error;
    }
}

