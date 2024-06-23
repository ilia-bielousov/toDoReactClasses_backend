import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import { check } from 'express-validator';
import { registration, login } from "./Controllers/auth.js";
import { addNote, getAllNotes, deleteNote, updateChecked, updateText } from "./Controllers/note.js";
import chekAuth from "./chekAuth.js";

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

mongoose.connect(
  'mongodb+srv://admin:12345@cluster0.7vr2kqk.mongodb.net/'
)
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
app.patch('/update-note-check', chekAuth, updateChecked);
app.patch('/update-note-text', chekAuth, updateText);

app.listen(PORT, () => {
  try {
    console.log('server OK');
  } catch (error) {
    console.log(error);
  }
});