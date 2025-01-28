import mongoose, { Schema, Document } from 'mongoose';

export interface IPlayer extends Document {
  username: string;
  fullname: string;
  patronymic: string;
  photo?: string;
  dob?: Date;
  gender?: string; // UUID reference to gender.gender_id
  email: string;
  password_hash: string;
  registration_date?: Date;
  last_login?: Date;
  status?: string;
  is_verified?: string;
  is_2fa?: string;
  currency?: string; // UUID reference to currencies.currency_id
  language?: string; // UUID reference to languages.language_id
  country?: string; // UUID reference to countries.country_id
  city?: string; // UUID reference to cities.city_id
  role_id: string; // UUID reference to roles.role_id
  created_at?: Date;
  updated_at?: Date;
}

const playerSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  fullname: { type: String, required: true },
  patronymic: { type: String, required: true },
  photo: { type: String },
  dob: { type: Date },
  gender: { type: String, ref: 'Gender' },
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  registration_date: { type: Date, default: Date.now },
  last_login: { type: Date },
  status: { type: String, default: 'active' },
  is_verified: { type: String, default: 'no' },
  is_2fa: { type: String, default: 'no' },
  currency: { type: String, ref: 'Currency' },
  language: { type: String, ref: 'Language' },
  country: { type: String, ref: 'Country' },
  city: { type: String, ref: 'City' },
  role_id: { type: String, ref: 'Role', required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.model<IPlayer>('Player', playerSchema);
