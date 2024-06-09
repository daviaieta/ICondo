import express from 'express'
import condominiumRoutes from './routes/condo.routes'
import unitRoutes from './routes/units.routes'
import personRouter from './routes/person.routes'
import authRouter from './routes/auth.routes'
import orderRouter from './routes/order.routes'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/auth', authRouter)
app.use('/condos', condominiumRoutes)
app.use('/units', unitRoutes)
app.use('/people', personRouter)
app.use('/orders', orderRouter)

const PORT = 5000
app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`)
})
