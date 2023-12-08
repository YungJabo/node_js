const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const formidable = require('formidable')
const db = require('../model')

router.get('/', (req, res, next) => {
  res.render('pages/admin', {
    title: 'Admin page',
    msgskill: req.flash('message')[0],
    msgfile: req.flash('message2')[0],
  })
})

router.post('/skills', (req, res, next) => {
  const formData = req.body
  let validation = true
  Object.keys(formData).forEach((key) => {
    if (!formData[key]) {
      validation = false
    }
  })
  if (validation) {
    Object.keys(formData).forEach((key) => {
      db.get('skills')
        .find({ type: key })
        .assign({ number: formData[key] })
        .write()
    })
    req.flash('message', 'Данные успешно отправлены!')
  } else {
    req.flash('message', 'Введие корректные данные!')
  }

  res.redirect('/admin')
})

router.post('/upload', (req, res, next) => {
  const dbPath = path.join(__dirname, '..', 'data.json')
  const dbData = JSON.parse(fs.readFileSync(dbPath))
  const formData = new formidable.IncomingForm()
  const filesFolder = path.join(__dirname, '..', 'upload')
  let validation = true
  formData.parse(req, function (err, fields, files) {
    if (err) {
      return next(err)
    }
    if (!fields.name[0] || !fields.price[0] || !files) {
      validation = false
    }
    const fileName = path.join(filesFolder, files.photo[0].originalFilename)

    if (validation) {
      fs.rename(files.photo[0].filepath, fileName, function (err) {
        if (err) {
          console.log(err)
          return
        }
      })
      const newData = {
        src: './' + files.photo[0].originalFilename,
        name: fields.name[0],
        price: Number(fields.price[0]),
      }

      db.get('products').push(newData).write()
      req.flash('message2', 'Данные успешно отправлены!')
    } else {
      req.flash('message2', 'Введите корректные данные!')
    }
    res.redirect('/admin')
  })
})

module.exports = router
