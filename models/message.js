export default (sequelize, DataTypes) => {
  const Message = sequelize.define('message', {
    text: DataTypes.TEXT
  });

  Message.associate = models => {
    Message.belongsTo(models.Position);
    Message.belongsTo(models.Language);
    Message.hasMany(models.Source);
  };

  return Message;
};
