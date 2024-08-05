const { sequelize } = require("../config/bdCon");
const {DataTypes} =require("sequelize")


const Usuarios = sequelize.define('Usuarios',{ 
    Id_Usuario: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
},
Name_usuario: {
    type: DataTypes.STRING(255),
    allowNull: false
},
Password_usuario: {
    type: DataTypes.STRING(255),
    allowNull: false
},

Estado_Intentos: {
    type: DataTypes.INTEGER,
    defaultValue: 0
},
Estado_Bloqueo: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
},
Fecha_Creacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
},
Fecha_Eliminacion: {
    type: DataTypes.DATE,
    allowNull: true
},
Id_Usuario_Eliminacion: {
    type: DataTypes.INTEGER,
    allowNull: true
}
}, {
tableName: 'usuarios',
timestamps: false 
});


Usuarios.belongsTo(Usuarios,{
    foreignKey:'Id_Usuario_Eliminacion',
    as:'UsuarioEliminador'
})

module.exports = Usuarios;