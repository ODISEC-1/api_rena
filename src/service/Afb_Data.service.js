const { Afb_dataSource, Afb_dataDestination } = require("../models/data.model");



async function syncData(){
    try {
        const DataRecords = await Afb_dataSource.findAll();
        const transaction = await Afb_dataDestination.sequelize.transaction();

        try {
            await Afb_dataDestination.destroy({where:{},transaction});

            for (const records of  DataRecords){
                await Afb_dataDestination.create(records.get({plain:true}),{transaction})
            }
            await transaction.commit();
            console.log('Data sicronizada exitosamente')
        } catch (error) {
            await transaction.rollback();
            console.error('Error synchronizing data:', error);
        }
    } catch (error) {
        console.error('Error fetching data from source:', error);
    }
}

module.exports = { syncData };
