const Sequelize = require('sequelize')
const db = require('./conn.models')

const Condominium = db.define('condominios', {
     id_condominio: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
     },
     razao_social: {
          type: Sequelize.STRING
     },
     logradouro: {
          type: Sequelize.STRING
     },
     numend: {
          type: Sequelize.STRING
     },
     complend: {
          type: Sequelize.STRING
     },
     bairro: {
          type: Sequelize.STRING
     },
     cidade: {
          type: Sequelize.STRING
     },
     uf: {
          type: Sequelize.STRING
     },
     cep: {
          type: Sequelize.INTEGER
     },
     telefone: {
          type: Sequelize.STRING
     },
     cnpj: {
          type: Sequelize.STRING
     },
}, {
     timestamps: false,
}
)

// Condominium.sync({ alter: true })
//      .then(() => {
//           console.log('Tabela Criada com sucesso')
//      })
//      .catch(erro => {
//           console.log('Erro ao criar a tabela: ' + erro)
//      })

module.exports = Condominium