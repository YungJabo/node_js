const express = require('express')
const router = express.Router()
const { products, skills } = require('../data.json')
const fs = require('fs')
const path = require('path')

router.get('/', (req, res, next) => {
  res.render('pages/index', { title: 'Main page', products, skills })
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
  data.messages.push(newData)
  const updatedData = JSON.stringify(data, null, 2)
  fs.writeFileSync(filePath, updatedData)
  res.send(`Спасибо, ${formData.name}, ваше сообщение отправлено!`)
})

module.exports = router
