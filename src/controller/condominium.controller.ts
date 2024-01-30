import { Request, Response } from "express"
import Condominium from '../models/condominium.models'

export class CondominiumController {
    static async listCondominium(req: Request, res: Response) {
        try{
            const condominiums = await Condominium.findAll()
            return res.render('condominiums/condominiums', { condominiums })
        } catch(error){
            return res.status(500).json({ error: error })
        }
    }

    static async createCondominium(req: Request, res: Response){
        if(req.method == 'GET'){
            try{
                return res.render('condominiums/newCondominium')
            } catch(error){
                return res.status(500).json({error: error})
            }
        }

        else{
            const { razao_social, logradouro, numend, complend,
                bairro, cidade, uf, cep, telefone, cnpj } = req.body
            try{
                await Condominium.create({
                    razao_social: razao_social,
                    logradouro: logradouro,
                    numend: numend,
                    complend: complend,
                    bairro: bairro,
                    cidade: cidade,
                    uf: uf,
                    cep: cep,
                    telefone: telefone,
                    cnpj: cnpj
                })
                return res.redirect('/condominiums')
            } catch(error){
                return res.status(500).json({ error: error })
            }
        }
    }

    static async deleteCondominium(req: Request, res: Response) {
        if(req.method == 'GET'){
            try{
                return res.render('condominiums/deleteCondominium')
            } catch(error){
                return res.status(500).json({ error: error })
            }
        } 

        else{
            const condominiumID = req.params.id
            try{
                await Condominium.destroy({
                    where: {id_condominio: condominiumID}
                })
            } catch(error){
                return res.status(500).json({ error: error })
            } 
        }
    }

}