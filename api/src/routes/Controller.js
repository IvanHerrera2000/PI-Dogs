const { Dog, Temperament } = require('../db');
const axios = require('axios');
const { API_KEY } = process.env;

//------------------------------GET---------------------------

//Info desde la API
const getDogsAPI = async () => {
  try {
    const apiUrl = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
    );
    const apiInfo = await apiUrl.data.map((element) => {
      return {
        id: element.id,
        name: element.name,
        image: element.image.url,
        temperament: element.temperament,
        weight_min: parseInt(element.weight.metric.slice(0, 2).trim()),
        weight_max: parseInt(element.weight.metric.slice(4).trim()),
        height_min: parseInt(element.height.metric.slice(0, 2).trim()),
        height_max: parseInt(element.height.metric.slice(4).trim()),
        life_span: element.life_span,
        breed_group: element.breed_group,
      };
    });
    return apiInfo;
  } catch (error) {
    console.log('ERROR IN getDogsAPI', error);
  }
};

//Info de la DataBase
const getDogsDB = async () => {
  try {
    return await Dog.findAll({
      include: {
        model: Temperament, //incluyo el modelo Temperament
        attributes: ['name'],
        through: {
          //validacion donde se constata que traiga solo los atributos señalados de la tabla Temperament
          attributes: [],
        },
      },
    });
  } catch (error) {
    console.log('ERROR IN getDogsDB', error);
  }
};

//Concateno la info de la DB y la API
const getAllDogs = async () => {
  try {
    const apiInfo = await getDogsAPI();
    const dbInfo = await getDogsDB();
    const allInfo = apiInfo.concat(dbInfo);
    return allInfo;
  } catch (error) {
    console.log('ERROR IN getAllInfo', error);
  }
};

module.exports = {
  getAllDogs,
  getDogsAPI,
  getDogsDB,
};
