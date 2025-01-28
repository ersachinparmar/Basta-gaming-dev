import Player from '../models/player';
import Role from '../models/role'; // Ensure Role model exists
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (data: any) => {
  const { username, email, password, role_id, fullname, patronymic } = data;

  if (!fullname || !patronymic) {
    throw new Error('fullname and patronymic are required');
  }

  const roleExists = await Role.findById(role_id);
  if (!roleExists) {
    throw new Error('Invalid role_id');
  }

  const existingPlayer = await Player.findOne({ email });
  if (existingPlayer) {
    throw new Error('Email already in use');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new player
  const player = new Player({
    username,
    email,
    password_hash: hashedPassword,
    role_id,
    fullname,
    patronymic,
  });

  await player.save();

  return { message: 'Player registered successfully' };
};

export const login = async (data: any) => {
  const { email, password } = data;

  const player = await Player.findOne({ email });
  if (!player) {
    throw new Error('Invalid email or password');
  }

  const isMatch = await bcrypt.compare(password, player.password_hash);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  // Generate JWT token
  const token = jwt.sign(
    { id: player._id, role_id: player.role_id },
    process.env.JWT_SECRET as string,
    { expiresIn: '1h' },
  );

  return { token };
};
