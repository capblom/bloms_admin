import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

const JWT_SECRET = "Kwe2augd";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    console.log('Received request:', { username, password });

    const user = await prisma.user.findUnique({
      where: { username },
    });
    console.log('User query result:', user);

    if (!user) {
      console.log('User not found');
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('Password valid:', isPasswordValid);

    if (!isPasswordValid) {
      console.log('Invalid password');
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username, permissionLevel: user.permissionLevel },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log('Generated token:', token);

    return NextResponse.json({ token, userId: user.id, username: user.username, permissionLevel: user.permissionLevel });
  } catch (error) {
    console.error('Error processing request:', error.stack || error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
