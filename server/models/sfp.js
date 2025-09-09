import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const sfpSchema = new Schema({
  p_n: {
    type: String,
    required: true,
    unique: false
  },
  state: {
    type: String,
    enum: ["New", "Refurbished"],
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  s_n: {
    type: [String], // Array of strings
    required: true
  },
  cantidad: {
    type: Number,
    required: true
  },
  p_a: {
    type: String,
    enum: ["Producción", "Almacén"],
    required: true
  },
  marca: {
    type: String,
    required: true
  }
});


const Sfp = model('Sfp', sfpSchema);

export default Sfp;