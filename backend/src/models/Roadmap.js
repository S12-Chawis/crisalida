module.exports = (sequelize, DataTypes) => {
  const Roadmap = sequelize.define("Roadmap", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: "roadmaps",
    timestamps: true,
    underscored: true
  });

  Roadmap.associate = (models) => {
    Roadmap.belongsTo(models.User, { foreignKey: "userId" });
  };

  return Roadmap;
};
