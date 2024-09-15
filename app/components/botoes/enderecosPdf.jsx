export default function enderecosPdf(cod) {
    console.log('servidor')
    if(cod === 1){
        return '/pdf/lei-issqn-lagoa-dos-patos-mg.pdf';
    }
    if(cod === 2){
        return '/pdf/codigo-tributario-lagoa-dos-patos-mg.pdf';
    }
    if(cod === 3){
        return 'https://lagoadospatos.mg.gov.br/leis/';
    }
    if(cod === 4){
        return 'https://lagoadospatos.mg.gov.br/secretarias/fazenda/';
    }
    return '';

}
