import express from 'express'
import configApp from './config'

import condominiumRoutes from './routes/condominium.router' 
import unitRoutes from './routes/units.routes' 
import personRouter from './routes/person.router'
import authRouter from './routes/auth.routes'

const app = express()
configApp(app)

app.use('/condominiums', condominiumRoutes)
app.use('/units', unitRoutes)
app.use('/people', personRouter)
app.use('/auth', authRouter)

const PORT = 3000
app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`)
})
