const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("videogame", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    released /*fecha de lanzamiento*/: {
      type: DataTypes.STRING,
    },
    background_image: {
      type: DataTypes.STRING,
    },

    rating: {
      type: DataTypes.DECIMAL,
      isDecimal: true,
    },


    createdInDb: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};