const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')

const notesPath = path.join(__dirname, 'db.json')

async function addNote(title) {
  const notes = await getNotes()
  const note = {
    title,
    id: Date.now().toString()
  }

  notes.push(note)

  await saveNotes(notes)
  console.log(chalk.green.inverse('Note was added!'))
}
async function updateTitle(id, newTitle) {
  const notes = await getNotes();
  const noteIndex = notes.findIndex(note => note.id === id);

  if (noteIndex !== -1) {
    notes[noteIndex].title = newTitle;
    await saveNotes(notes);
    console.log(chalk.yellow.inverse(`Note ${id} was updated!`));
  } else {
    console.log(chalk.red.inverse(`Note ${id} not found!`));
  }
}

async function removeNote(id) {
  const notes = await getNotes()
  const filter = notes.filter(note => note.id !== id)

  await saveNotes(filter)
  console.log(chalk.red.inverse(`Note ${id} was remove!`))
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, {encoding: 'utf-8'})
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function saveNotes(notes) {
  await fs.writeFile(notesPath, JSON.stringify(notes))
}

async function printNotes() {
  const notes = await getNotes()

  console.log(chalk.blue.inverse('Here is the list of notes:'))
  notes.forEach(note => {
    console.log(chalk.bgWhite(note.id), chalk.blue(note.title))
  })
}



module.exports = {
  addNote, getNotes, removeNote, updateTitle
}