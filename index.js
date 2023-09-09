// const http = require('http')
const express = require('express')
const chalk = require('chalk')
// const fs = require('fs/promises')
const path = require('path')
const {addNote, getNotes, removeNote, updateTitle} = require('./notes.controller')

const port = 3000

// const basePath = path.join(__dirname, 'pages')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'pages')

app.use(express.static(path.resolve(__dirname, 'public')))
app.use(express.urlencoded({
  extended: true
}))
app.use(express.json());

app.get('/', async (req, res) => {
  // Check if there is an action
  if (req.query.action) {
    if (req.query.action === "delete" && req.query.id) {
      await removeNote(req.query.id);
    }

    if (req.query.action === "update" && req.query.id && req.query.title) {
      await updateTitle(req.query.id, req.query.title);
    }
  }

  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: req.query.created === 'true'
  })
});


app.post('/', async (req, res) => {
  await addNote(req.body.title);
  res.redirect('/?created=true');
});

app.listen(port, () => {
  console.log(chalk.green(`Server has been started on port ${port}...`))
})