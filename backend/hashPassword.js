import bcrypt from 'bcryptjs';

const hashPassword = async () => {
  const plainPassword = 'admin123'; 
  const hashedPassword = await bcrypt.hash(plainPassword, 10);
  console.log('Hashed Password:', hashedPassword);
};

hashPassword();
