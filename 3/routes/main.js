const express = require('express')
const router = express.Router()
// const { products, skills } = require('../data.json')
const fs = require('fs')
const path = require('path')
const db = require('../model')
const skills = db.get('skills').value()
const products = db.get('products').value()

router.get('/', (req, res, next) => {
  res.render('pages/index', {
    title: 'Main page',
    products,
    skills,
    msgemail: req.flash('message')[0],
  })
})

router.post('/', (req, res, next) => {
  // TODO: Реализовать функционал отправки письма.
  const formData = req.body
  const filePath = path.join(__dirname, '..', 'data.json')
  const data = JSON.parse(fs.readFileSync(filePath))
  const newData = {
    Name: formData.name,
    Email: formData.email,
    Message: formData.message,
  }
  if (!newData.Email || !newData.Name || !newData.Message) {
    req.flash('message', 'Введите корректные данные!')
  } else {
    req.flash('message', 'Данные успешно отправлены!')
    db.get('messages').push(newData).write()
  }
  res.redirect('/')

  // data.messages.push(newData)
  // const updatedData = JSON.stringify(data, null, 2)
  // fs.writeFileSync(filePath, updatedData)
})

module.exports = router
