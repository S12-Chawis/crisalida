module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM("admin", "learner"),
      defaultValue: "learner"
    },
    xp: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    currentLevel: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  }, {
    tableName: "users",
    timestamps: true,
    underscored: true
  });

  User.associate = (models) => {
    // Ejemplo: un usuario tiene muchos roadmaps
    User.hasMany(models.Roadmap, { foreignKey: "userId" });
  };

  return User;
};
