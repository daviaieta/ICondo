import express from 'express'
import configApp from './config'
import condominiumRoutes from './routes/condominium.router' 

const app = express()
configApp(app)

// Condominium Routes
app.use('/condominiums', condominiumRoutes)


const PORT = 3000
app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`)
})
