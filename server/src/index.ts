import express from 'express'
import loginRoutes from './routes/login.routes'
import unitRoutes from './routes/units.routes'
import userRoutes from './routes/user.routes'
import condoRoutes from './routes/condo.routes'
import authRoutes from './routes/auth.routes'
import orderRoutes from './routes/order.routes'
import cors from 'cors'
import { authMiddleware } from './middleware/auth.middleware'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/login', loginRoutes)
//app.use(authMiddleware)

app.use('/auth', authRoutes)
app.use('/condos', condoRoutes)
app.use('/units', unitRoutes)
app.use('/users', userRoutes)
app.use('/orders', orderRoutes)

const PORT = 5000
app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`)
})
