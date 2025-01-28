import Player from '../models/player';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (data: any) => {
  const { username, email, password, role } = data;

  const existingPlayer = await Player.findOne({ email });
  if (existingPlayer) {
    throw new Error('Email already in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const player = new Player({
    username,
    email,
    password_hash: hashedPassword,
    role,
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

  const token = jwt.sign(
    { id: player._id, role: player.role },
    process.env.JWT_SECRET as string,
    {
      expiresIn: '1h',
    },
  );
  console.log('token', token);
  return { token };
};
