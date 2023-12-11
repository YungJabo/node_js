const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')

router.get('/', (req, res, next) => {
  res.render('pages/login', {
    title: 'SigIn page',
    msglogin: req.flash('messageLogin')[0],
  })  
})

router.post('/', (req, res, next) => {
  const formData = req.body
  const filePath = path.join(__dirname, '..', 'data.json')
  const data = JSON.parse(fs.readFileSync(filePath))
  if (
    formData.email === data.admin.email &&
    formData.password === data.admin.password
  ) {
    res.redirect('/admin')
  } else {
    req.flash('messageLogin', 'Ошибка! Введенные данные не совпадают!')
  }
  res.redirect('/login')
})

module.exports = router
