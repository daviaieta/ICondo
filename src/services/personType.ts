const determinePersonType = (person:any) =>{
    if (person.super_admin === 's') {
        return 'super_admin'

   } else if (person.dataValues.morador === 's') {
        return 'morador'

   } else if (person.dataValues.administrador === 's') {
        return 'administrador'

   } else if (person.dataValues.operador === 's') {
        return 'operador'
   }
}

export default determinePersonType
