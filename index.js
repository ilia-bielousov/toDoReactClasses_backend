import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import { check } from 'express-validator';
import { registration, login } from "./Controllers/auth.js";
import { addNote, getAllNotes, deleteNote, updateChecked } from "./Controllers/note.js";
import chekAuth from "./chekAuth.js";

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('db ok'))
  .catch((error) => console.log(error));

app.post('/registration', [
  check('username', 'Имя пользователя не может быть пустым и минимум 3 символа').notEmpty().isLength({ min: 3, max: 10 }),
  check('password', 'Пароль делжен быть больше 4 и меньше 10').isLength({ min: 4, max: 10 })
], registration);
app.post('/login', login);

app.post('/add-note', chekAuth, addNote);
app.get('/notes', chekAuth, getAllNotes);
app.delete('/delete-note', chekAuth, deleteNote);
app.patch('/update-note', chekAuth, updateChecked);

app.listen(process.env.PORT || 5000, () => {
  try {
    console.log('server OK');
  } catch (error) {
    console.log(error);
  }
});