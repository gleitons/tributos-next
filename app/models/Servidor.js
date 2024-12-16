import mongoose from 'mongoose';


const servidorSchema = new mongoose.Schema({
    nome: string,
    cargo: String,
    sexo: String,
    setor: String,
    telefone: String,
    nascimento: String,
    image: String,
});

export default mongoose.models.Servidor || mongoose.model('Servidor', servidorSchema)


