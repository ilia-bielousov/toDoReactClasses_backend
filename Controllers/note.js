import Note from '../Models/Note.js';

export const addNote = async (req, res) => {
  try {
    const doc = new Note({
      user: req.userId,
      text: req.body.text,
      profile: req.body.profile
    });

    await doc.save();

    return res.json({ succes: true });
  } catch (err) {
    console.log(err);

    return res.status(500).json({ succes: false })
  }
}

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.userId });

    return res.json(notes);
  } catch (err) {
    return res.status(500).json({ succes: false });
  }
}

export const deleteNote = async (req, res) => {
  try {
    const { _id } = req.body;

    if (!_id) {
      return res.status(400).json({ message: 'note is not found' });
    }

    const note = await Note.findByIdAndDelete(_id);

    return res.status(200).json({ succes: true });
  } catch (err) {
    return res.status(500).json({ succes: false });
  }
}

export const updateChecked = async (req, res) => {
  try {
    const note = req.body;

    if (!note._id) {
      res.status(400).json({ message: 'Id не указан' });
    }

    const updateNote = await Note.findByIdAndUpdate(note._id, { checked: note.checked });

    return res.json(updateNote);
  } catch (err) {
    return res.status(500).json({ succes: false });
  }
}

export const updateText = async (req, res) => {
  try {
    const note = req.body;

    if (!note._id) {
      res.status(400).json({ message: 'Id не указан' });
    }

    const updateNote = await Note.findByIdAndUpdate(note._id, { text: note.text });

    return res.json(updateNote);
  } catch (err) {
    return res.status(500).json({ succes: false });
  }
}