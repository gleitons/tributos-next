import mongoose from 'mongoose';


const servidorSchema = new mongoose.Schema({
    nome: {type: String, requerid: true},
    cargo: String,
    sexo: String,
    setor: String,
    telefone: String,
    nascimento: String,
    image: String,
});

export default mongoose.models.Servidor || mongoose.model('Servidor', servidorSchema)

// const servidorSchema = new mongoose.Schema({
//   nome: String,
//   cargo: String,
//   sexo: String,
//   setor: String,
//   telefone: String,
//   nascimento: String,
//   image: String,
// })

// export default mongoose.models.Servidor || mongoose.model('Servidor', servidorSchema);


