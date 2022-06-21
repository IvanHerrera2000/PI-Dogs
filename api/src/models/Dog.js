const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID, //id alfanumerico
      primaryKey: true,
      allowNull: false, //campo requerido
      defaultValue: DataTypes.UUIDV4, //
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false, //campo requerido
      unique: true,
    },

    weight_max: {
      type: DataTypes.STRING,
      allowNull: false, //campo requerido
    },

    weight_min: {
      type: DataTypes.STRING,
      allowNull: false, //campo requerido
    },

    height_max: {
      type: DataTypes.STRING,
      allowNull: false, //campo requerido
    },

    height_min: {
      type: DataTypes.STRING,
      allowNull: false, //campo requerido
    },

    life_time_min: {
      type: DataTypes.STRING,
      allowNull: true, //campo NO requerido
    },

    life_time_max: {
      type: DataTypes.STRING,
      allowNull: true, //campo NO requerido
    },

    image: {
      type: DataTypes.TEXT,
      allowNull: true, //campo NO requerido
    },

    //para saber si es un dog creado por el usuario
    userCreated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  });
};
