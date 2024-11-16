import mongoose from 'mongoose';


const ufmSchema = new mongoose.Schema({
  valor: Number,
})

export default mongoose.models.ufm || mongoose.model('ufm', ufmSchema);


// const ConfigSchema = new mongoose.Schema({
//   valor: { type: Number, required: true },
// }, { timestamps: true });


// const kittySchema = new mongoose.Schema({
//   name: String
// });

// export default mongoose.models.ufm || mongoose.model('valor', ConfigSchema);
