export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
  }, {
    tableName: 'users',
  });

  User.associate = (models) => {
    User.hasMany(models.Property, {
      foreignKey: 'userId',
      as: 'properties',
    });
  };

  return User;
};
