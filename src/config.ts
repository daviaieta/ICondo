import express from 'express'
import * as exphbs from 'express-handlebars'
import path from 'path'
import cookieParser from 'cookie-parser'

const configApp = (app: any): void => {
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use('/public', express.static(path.join(__dirname, '../src/public')))
  app.use(cookieParser())

  const handlebars = exphbs.create({
    defaultLayout: 'main',
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })

  app.engine('handlebars', handlebars.engine)
  app.set('view engine', 'handlebars')
  app.set('views', path.join(__dirname, '/views'))
}

export = configApp
