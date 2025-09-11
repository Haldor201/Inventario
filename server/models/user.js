import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Longitud mínima para la contraseña
    },
    // Puedes añadir otros campos como 'role', 'isActive', etc.
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: true, // Agrega automáticamente los campos 'createdAt' y 'updatedAt'
  }
);
