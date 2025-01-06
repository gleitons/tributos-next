import puppeteer from 'puppeteer';

export default async function Page() {
 

    async function scrapeData() {
        const browser = await puppeteer.launch({ headless: true });
       
        for (let matricula = 1; matricula <= 2; matricula++) {
            const page = await browser.newPage();

            await page.goto(`http://177.36.214.154/e-cidadeonline/listabicimovel.php?matricula=${matricula}`);
           
            const dados = await page.evaluate(() => {
          
                const tabela = document.querySelectorAll('tbody')[0].textContent;               
                   
                
            });     
              
            
        }
        await browser.close();
        
    }
    await scrapeData();

    return (
        <div>
            <h1>Dados</h1>

        </div>

    )
}
