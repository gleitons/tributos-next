import mongoose from 'mongoose';

const DataSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descricao: { type: String, required: true },
  utilidade: { type: String, required: true },
  escola: { type: String, required: true },
  local: { type: String, required: true },
  pdf: { type: String, required: true },
  info: { type: String, required: true },
  data: { type: Date, default: Date.now },
});

export default mongoose.models.Data || mongoose.model('Data', DataSchema);
