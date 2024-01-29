import express from 'express'
import * as exphbs from 'express-handlebars'
import path from 'path'

const configApp = (app: any): void => {
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

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
