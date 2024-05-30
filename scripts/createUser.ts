const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const firstName = 'Christopher';
  const lastName = 'Blom';
  const password = 'Kwe2augd';
  const hashedPassword = await bcrypt.hash(password, 10);
  const username = `${firstName.charAt(0).toLowerCase()}.${lastName.toLowerCase()}`;
  const permissionLevel = 1;

  try {
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        username,
        password: hashedPassword,
        permissionLevel,
      },
    });
    console.log('User created:', user);
  } catch (error) {
    console.error('Error creating user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
