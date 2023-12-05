const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const formidable = require('formidable')
const db = require('../model')

router.get('/', (req, res, next) => {
  // TODO: Реализовать, подстановку в поля ввода формы 'Счетчики'
  // актуальных значений из сохраненых (по желанию)
  res.render('pages/admin', { title: 'Admin page' })
})

router.post('/skills', (req, res, next) => {
  /*
  TODO: Реализовать сохранение нового объекта со значениями блока скиллов

    в переменной age - Возраст начала занятий на скрипке
    в переменной concerts - Концертов отыграл
    в переменной cities - Максимальное число городов в туре
    в переменной years - Лет на сцене в качестве скрипача
  */
  const formData = req.body
  const filePath = path.join(__dirname, '..', 'data.json')
  const data = JSON.parse(fs.readFileSync(filePath))
  const newData = [
    {
      number: formData.age,
      text: 'Возраст начала занятий на скрипке',
    },
    {
      number: formData.concerts,
      text: 'Концертов отыграл',
    },
    {
      number: formData.cities,
      text: 'Максимальное число городов в туре',
    },
    {
      number: formData.years,
      text: 'Лет на сцене в качестве скрипача',
    },
  ]
  // data.skills = newData
  // const updatedData = JSON.stringify(data, null, 2)
  // fs.writeFileSync(filePath, updatedData)
  db.set('skills', newData).write()
  // res.send('Реализовать сохранение нового объекта со значениями блока скиллов')
})

router.post('/upload', (req, res, next) => {
  /* TODO:
   Реализовать сохранения объекта товара на стороне сервера с картинкой товара и описанием
    в переменной photo - Картинка товара
    в переменной name - Название товара
    в переменной price - Цена товара
    На текущий момент эта информация хранится в файле data.json  в массиве products
  */
  const dbPath = path.join(__dirname, '..', 'data.json')
  const dbData = JSON.parse(fs.readFileSync(dbPath))
  const formData = new formidable.IncomingForm()
  const filesFolder = path.join(__dirname, '..', 'upload')
  formData.parse(req, function (err, fields, files) {
    console.log(files.photo[0], fields)
    if (err) {
      return next(err)
    }
    const fileName = path.join(filesFolder, files.photo[0].originalFilename)
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
    // dbData.products.push(newData)
    // const updatedData = JSON.stringify(dbData, null, 2)
    // fs.writeFileSync(dbPath, updatedData)
    db.get('products').push(newData).write()
  })
})

module.exports = router
