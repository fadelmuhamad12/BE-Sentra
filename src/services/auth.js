const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/secret');
const { hashSync, compareSync } = require('bcrypt');
const prisma = require("../db");

const signup = async (req, res) => {
  const { email, password, username, phoneNumber, address, role } = req.body;

  try {
    const user = await prisma.user.findFirst({ where: { email } });

    if (user) {
      return res.status(400).json({ error: 'User Already Exists' });
    }

    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashSync(password, 10),
        phoneNumber,
        address,
        role
      },
    });

    res.status(201).json({
      code: 201,
      status: 'OK',
      data: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await prisma.user.findFirst({ where: { username } });

  if (!user) {
    throw Error('User Does Not Exist!');
  }

  if (!compareSync(password, user.password)) {
    throw Error('User Does Not Exist!');
  }

  const token = jwt.sign(
    {
      userId: user.id,
      username: user.username,
      address: user.address,
      authed: user.authed,
      role: user.role
    },
    JWT_SECRET
  );

  res.json({ user, token });
};

module.exports = {
  signup,
  login,
};
