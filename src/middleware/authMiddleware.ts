import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const authenticate = (req: Request, res: Response, next: NextFunction):any =>{
    const token = req.cookies['jwt']

    if(!token){
        return res.status(401).json({ message: 'Invalid Token' })
    }

    jwt.verify(token, '123', (error: any, decoded: any) =>{
        if(error){
            return res.status(401).json({ message: 'Invalid Token' })
        }

        (req as any).user = decoded
        next()
    })

}

export default authenticate
