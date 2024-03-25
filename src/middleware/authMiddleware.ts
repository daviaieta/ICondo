import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const authenticate = (req: Request, res: Response, next: NextFunction) =>{
    const token = req.cookies['jwt']

    if(!token){
        return res.status(401).json({ message: 'Unauthorized' })
    }

    jwt.verify(token, '123', (error: any, decoded: any) =>{
        if(error){
            return res.status(401).json({ message: 'Unauthorized' })
        }

        (req as any).user = decoded
        next()
    })

}

export default authenticate
