export default (sequelize, DataTypes) => {
  const Topic = sequelize.define('topic', {
    slug: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.STRING
  });

  Topic.associate = models => {
    models.Topic.belongsTo(models.Election);
    models.Topic.hasMany(models.Position);
  };

  return Topic;
};
