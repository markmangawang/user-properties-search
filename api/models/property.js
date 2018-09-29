export default (sequelize, DataTypes) => {
  const Property = sequelize.define('Property', {
    userId: DataTypes.INTEGER,
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.STRING,
    rent: DataTypes.FLOAT,
  }, {
    tableName: 'properties',
  });

  Property.associate = (models) => {
    Property.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };

  return Property;
};
