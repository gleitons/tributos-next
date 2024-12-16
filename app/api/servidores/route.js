import connectToDatabase from '../../../lib/mongodb';
import Servidor from '../../models/Servidor';



export async function POST(req) {
  await connectToDatabase();
  
 
  try {
    const { method } = req;
   
    const servidor = new Servidor(req.body);
    await servidor.save();
    
    return res.status(201).json({ success: true, data: servidor });
  } catch (error) {
    console.error('Erro ao salvar servidor:', error);
    return res.status(400).json({ success: false, error: error.message });
  }
 
}
