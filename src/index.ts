import express from 'express'
import configApp from './config'
import condominiumRoutes from './routes/condominium.router' 
import unitsRoutes from './routes/units.routes' 

const app = express()
configApp(app)

app.use('/condominiums', condominiumRoutes)
app.use('/units', unitsRoutes)

const PORT = 3000
app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`)
})
