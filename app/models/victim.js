module.exports = function(sequelize, DataTypes) {
    let Victim = sequelize.define('victim', {
        guest_count: DataTypes.INTEGER,
        start_date: DataTypes.DATE,
        end_date: DataTypes.DATE,
        location: {
            type: DataTypes.GEOMETRY('POINT')
        },
        first_name: DataTypes.STRING(255),
        last_name: DataTypes.STRING(255),
        phone: DataTypes.STRING(10),
        address: DataTypes.STRING,
        email: DataTypes.STRING
    })

    return Victim
}