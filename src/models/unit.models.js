const Sequelize = require('sequelize')
const db = require('./conn.models')
const Condominium = require('./condominium.models')
const Person = require('./person.models')

const Unit = db.define('unidades', {
     id_unidade: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
     },
     bloco: {
          type: Sequelize.STRING
     },
     tipo: {
          type: Sequelize.STRING
     },
     unidade: {
          type: Sequelize.STRING
     },
     vaga_fixa: {
          type: Sequelize.STRING
     },
     id_condominio: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
               model: Condominium,
               key: 'id_condominio'
          }
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

Unit.belongsTo(Condominium, {
     foreignKey: 'id_condominio',
     as: 'condominios'
})

Unit.belongsTo(Person, {
     foreignKey: 'id_created_by',
     as: 'created_by'
})

// Unit.sync({ alter: true })
//      .then(() => {
//           console.log('Tabela Criada ou Alterada com sucesso')
//      })
//      .catch(erro => {
//           console.log('Erro ao criar a tabela: ' + erro)
//      })

module.exports = Unit