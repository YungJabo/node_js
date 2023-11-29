const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')

// const isAdmin = (req, res, next) => {
//   if (req.session.isAdmin) {
//     return next()
//   }
// }
router.get('/', (req, res, next) => {
  res.render('pages/login', { title: 'SigIn page' })
})

router.post('/', (req, res, next) => {
  // TODO: Реализовать функцию входа в админ панель по email и паролю

  const formData = req.body
  const filePath = path.join(__dirname, '..', 'data.json')
  const data = JSON.parse(fs.readFileSync(filePath))
  if (
    formData.email === data.admin.email &&
    formData.password === data.admin.password
  ) {
    res.render('pages/admin', { title: 'Admin page' })
  } else {
    res.send('Ошибка! Неверно введены данные!')
  }
})

module.exports = router
