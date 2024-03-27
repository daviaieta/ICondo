const Sequelize = require('sequelize')
const db = require('./conn.models')
const Unidades = require('./unit.models')

const Person = db.define('pessoas', {
     id_pessoa: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
     },
     nome: {
          type: Sequelize.STRING,
          allowNull: false
     },
     sobrenome: {
          type: Sequelize.STRING,
          allowNull: true
     },
     data_nascimento: {
          type: Sequelize.DATE,
          allowNull: true
     },
     cpf: {
          type: Sequelize.STRING,
          allowNull: false
     },
     telefone: {
          type: Sequelize.STRING,
          allowNull: true
     },
     email: {
          type: Sequelize.STRING,
          allowNull: false
     },
     operador: {
          type: Sequelize.STRING
     },
     administrador: {
          type: Sequelize.STRING
     },
     morador: {
          type: Sequelize.STRING
     },
     super_admin: {
          type: Sequelize.STRING
     },
     primeiro_acesso: {
          type: Sequelize.STRING
     },
     data_cadastro: {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: Sequelize.NOW
     },
     senha: {
          type: Sequelize.STRING,
          allowNull: true
     },
     token: {
          type: Sequelize.STRING,
          allowNull: true
     },
     login_token: {
          type: Sequelize.STRING,
          allowNull: true
     },
     id_unidade: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
               model: Unidades,
               key: 'id_unidade'
          }
     },
}, {
     timestamps: false,
}
)

// Person.belongsTo(Unidades, {
//      foreignKey: 'id_unidade',
//      as: 'unidade'
// })

// Person.sync({ alter: true })
//      .then(() => {
//           console.log('Tabela Criada com sucesso')
//      })
//      .catch(erro => {
//           console.log('Erro ao criar a tabela: ' + erro)
//      })

module.exports = Person