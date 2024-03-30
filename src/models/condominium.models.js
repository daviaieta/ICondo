const Sequelize = require('sequelize')
const db = require('./conn.models')
const Person = require('./person.models')

const Condominium = db.define('condominios', {
     id_condominio: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
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
     complemento: {
          type: Sequelize.STRING
     },
     bairro: {
          type: Sequelize.STRING
     },
     localidade: {
          type: Sequelize.STRING
     },
     uf: {
          type: Sequelize.STRING
     },
     cep: {
          type: Sequelize.STRING
     },
     telefone: {
          type: Sequelize.STRING
     },
     cnpj: {
          type: Sequelize.STRING
     },
     id_created_by: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
               model: Person,
               key: 'id_pessoa'
          }
     },
}, {
     timestamps: false,
}
)

// Condominium.belongsTo(Person, {
//      foreignKey: 'id_created_by',
//      as: 'created_by'
// })

// Condominium.sync({ alter: true })
//      .then(() => {
//           console.log('Tabela Criada ou Alterada com sucesso')
//      })
//      .catch(erro => {
//           console.log('Erro ao criar a tabela: ' + erro)
//      })

module.exports = Condominium