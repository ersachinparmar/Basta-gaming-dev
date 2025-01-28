import mongoose, { Schema, Document } from 'mongoose';

export interface IPlayer extends Document {
  username: string;
  fullname?: string;
  patronymic?: string;
  photo?: string;
  dob?: Date;
  gender?: number;
  email: string;
  password_hash: string;
  registration_date?: Date;
  last_login?: Date;
  status?: string;
  is_verified?: string;
  is_2fa?: string;
  currency?: number;
  language?: string;
  country?: string;
  city?: string;
  role: string;
  created_at?: Date;
  updated_at?: Date;
}

const playerSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  fullname: { type: String },
  patronymic: { type: String },
  photo: { type: String },
  dob: { type: Date },
  gender: { type: Number },
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  registration_date: { type: Date, default: Date.now },
  last_login: { type: Date },
  status: { type: String, default: 'active' },
  is_verified: { type: String, default: 'no' },
  is_2fa: { type: String, default: 'no' },
  currency: { type: Number },
  language: { type: String },
  country: { type: String },
  city: { type: String },
  role: { type: String, enum: ['admin', 'player', 'guest'], default: 'player' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.model<IPlayer>('Player', playerSchema);
