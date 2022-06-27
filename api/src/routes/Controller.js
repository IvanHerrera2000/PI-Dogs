const { Dog, Temperament } = require('../db');
const axios = require('axios');

//------------------------------GET---------------------------

//Info desde la API
const getDogsAPI = async () => {
  try {
    const apiUrl = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=232bd982-32a3-43b7-a1e4-bbcb2bdf72bc`
    );
    const apiInfo = await apiUrl.data.map((e) => {
      return {
        name: e.name,

        id: e.id,

        height_min:
          e.height.metric.split(' - ')[0] && e.height.metric.split(' - ')[0],

        height_max:
          e.height.metric.split(' - ')[1] && e.height.metric.split(' - ')[1],

        weight_min:
          e.weight.metric.split(' - ')[0] !== 'NaN'
            ? e.weight.metric.split(' - ')[0]
            : 6,

        weight_max:
          e.weight.metric.split(' - ')[1] && e.weight.metric.split(' - ')[1],

        life_time_min:
          e.life_span.split(' - ')[0] && e.life_span.split(' - ')[0],

        life_time_max:
          e.life_span.split(' - ')[1] &&
          e.life_span.split(' - ')[1].split(' ')[0],

        temperament: e.temperament ? e.temperament : 'Unknown',

        image: e.image.url,
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
    const dogs = await Dog.findAll({
      include: Temperament,
    });

    const info = dogs.map((e) => {
      let temp = e.temperaments.map((e) => e.name);
      let aux = temp.join(', ');
      return {
        name: e.name,
        id: e.id,
        userCreated: e.userCreated,
        height_max: e.height_max,
        height_min: e.height_min,

        weight_max: e.weight_max,
        weight_min: e.weight_min,

        life_time_max: e.life_time_max,
        life_time_min: e.life_time_min,

        temperament: aux,
        image: e.image
          ? e.image
          : 'https://pm1.narvii.com/6893/724dede9a107e0d420269799b4efe8be26a88df9r1-842-1024v2_00.jpg',
      };
    });
    return info;
  } catch (error) {
    console.log('ERROR IN getDogsDB', error);
  }
};

//Concateno la info de la DB y la API
const getAllDogs = async () => {
  try {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDBinfo();
    const allInfo = apiInfo.concat(dbInfo);
    return allInfo;
  } catch (error) {
    console.log('ERROR IN allInfo', error);
  }
};

module.exports = {
  getAllDogs,
  getDogsAPI,
  getDogsDB,
};
