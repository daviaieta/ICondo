import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { prisma } from '../lib/prisma'

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      return res.status(401).send({
        error: 'Authorization token not provided',
      })
    }
    jwt.verify(token, '123')

    const decode = jwt.decode(token) as JwtPayload
    const userId = decode.id

    const user = await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
    })

    if (!user) {
      return res.status(401).send({
        error: 'User not found',
      })
    }

    if (user.token != token) {
      return res.status(401).send({
        error: 'Token invalid',
      })
    }

    req.body.tokenId = user.id
    next()
  } catch (error) {
    return res.status(401).send({
      error: 'Not authorized',
    })
  }
}
