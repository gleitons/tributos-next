  export const upper = (nome:string) => {
    return nome.split(' ').map(texto => texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase()).join(' ')
  }