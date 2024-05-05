import express from 'express'
import cookieParser from 'cookie-parser'

const configApp = (app: any): void => {
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(cookieParser())
}

export = configApp
