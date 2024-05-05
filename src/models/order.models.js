const Sequelize = require('sequelize')
const db = require('./conn.models')
const Unidades = require('./unit.models')

const Encomendas = db.define(
  'encomendas',
  {
    id_encomenda: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nota_fiscal: {
      type: Sequelize.STRING,
    },
    codigo_rastreio: {
      type: Sequelize.STRING,
    },
    dh_entrada: {
      type: Sequelize.TIME,
    },
    dh_saida: {
      type: Sequelize.DATE,
    },
    protocolo: {
      type: Sequelize.STRING,
    },
    id_unidade: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Unidades,
        key: 'id_unidade',
      },
    },
  },
  {
    timestamps: false,
  },
)

// Encomendas.belongsTo(Unidades, {
//      foreignKey: 'id_unidade',
//      as: 'unidade'
// })

// Encomendas.sync({ alter: true })
//      .then(() => {
//           console.log('Tabela Criada com sucesso')
//      })
//      .catch(erro => {
//           console.log('Erro ao criar a tabela: ' + erro)
//      })

module.exports = Encomendas
