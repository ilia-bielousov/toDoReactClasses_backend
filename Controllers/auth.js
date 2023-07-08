import { validationResult } from "express-validator";
import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import User from "../Models/User.js";

const generateAccessToken = (id) => {
  const payload = {
    id
  };

  return jsonwebtoken.sign(payload, 'secret', { expiresIn: '30d' });
}

export const registration = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Error registration', success: false });
    }

    const { username, password } = req.body;
    const candidate = await User.findOne({ username });

    if (candidate) {
      return res.status(400).json({ message: 'User with such username already exists', success: false });
    }

    const hashPassword = bcryptjs.hashSync(password, 2);
    const user = new User ({ username, password: hashPassword});

    user.save();

    return res.status(200).json({ message: 'User successfully registered', success: true });
  } catch (error) {
    res.status(400).json({ message: 'Error registration', success: false});

    console.log(error);
  }
}

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User is not found', success: false });
    }

    const validPassword = bcryptjs.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: 'Wrong password entered', success: false });
    }

    const token = generateAccessToken(user._id);
    return res.json({ ...user._doc, token, success: true });

  } catch(error) {
    console.log(error);
    res.status(400).json({ message: 'Something went wrong', success: false });
  }
}