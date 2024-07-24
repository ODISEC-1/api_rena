const { Tabla_Agencia } = require("../Agencia.model");
const { Derivaciones } = require("../Derivaciones");
const { JZtable } = require("../JZ.model");
const { supervisorTable } = require("../Supervisor.model");

Derivaciones.belongsTo(Tabla_Agencia, { foreignKey: 'agencia', targetKey: 'Id_Agencia' });
Derivaciones.belongsTo(JZtable, { foreignKey: 'jefeZonal', targetKey: 'id_JZ' });
Derivaciones.belongsTo(supervisorTable, { foreignKey: 'supervisor', targetKey: 'id_Super' });


module.exports = {
    Derivaciones,
    Tabla_Agencia,
    JZtable,
    supervisorTable,
};