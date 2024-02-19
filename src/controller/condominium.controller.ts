import { Request, Response } from "express"
import Condominium from '../models/condominium.models'

export class CondominiumController {
    static async listCondominiums(req: Request, res: Response) {
        try{
            const condominiums = await Condominium.findAll()
            return res.render('condominiums/list', { condominiums })
        } catch(error){
            return res.status(500).json({ error: error })
        }
    }

    static async createCondominium(req: Request, res: Response){
        if(req.method == 'GET'){
            try{
                return res.render('condominiums/create')
            } catch(error){
                return res.status(500).json({error: error})
            }
        }

        else{
            const { razao_social, logradouro, numend, complemento,
                bairro, localidade, uf, cep, telefone, cnpj } = req.body
            try{
                await Condominium.create({
                    razao_social: razao_social,
                    logradouro: logradouro,
                    numend: numend,
                    complemento: complemento,
                    bairro: bairro,
                    localidade: localidade,
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
        let condominiumID = req.params.id
        if(req.method == 'GET'){
            try{
                return res.render('condominiums/delete', { condominiumID })
            } catch(error){
                return res.status(500).json({ error: error })
            }
        } 

        else{
            try{
                await Condominium.destroy({
                    where: {id_condominio: condominiumID}
                })
                return res.redirect('/condominiums')
            } catch(error){
                return res.status(500).json({ error: error })
            } 
        }
    }

}