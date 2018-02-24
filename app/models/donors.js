module.exports = function(sequelize, DataTypes){
	var Donor = sequelize.define("Donor", {
		name: DataTypes.STRING,
		email: DataTypes.STRING,
		amount: DataTypes.INTEGER,
		phone: DataTypes.STRING(10)
	});
	return Donor;
}