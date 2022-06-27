const { Dog, Temperament } = require('../db.js');
const { getAllDogs, getDogsAPI } = require('./Controller');
const express = require('express');
const router = express.Router();
const axios = require('axios');
//middleware permite leer el body de la peticion
router.use(express.json());

// - [X] __GET /dogs:
// - Obtener un listado de las razas de perro
// - Debe devolver solo los datos necesarios para la ruta principal

// - [X] __GET /dogs?name="...":
// - Obtener un listado de las razas de perro que contengan la palabra ingresada como query parameter
// - Si no existe ninguna raza de perro mostrar un mensaje adecuado

router.get('/dogs', async (req, res) => {
  const name = req.query.name;
  let AllDogs = await getAllDogs();
  if (name) {
    let dogName = await AllDogs.filter((element) =>
      element.name.toLowerCase().includes(name.toLowerCase())
    );
    dogName.length
      ? res.status(200).send(dogName)
      : res.status(404).send('Dog not found whith this name');
  } else {
    res.status(200).send(AllDogs);
  }
});

// - [ ] GET /temperament:
// - Obtener todos los temperamentos posibles
// - En una primera instancia deberán obtenerlos desde la API externa y guardarlos en su propia base de datos y luego ya utilizarlos desde allí

router.get('/temperament', async (req, res) => {
  try {
    const dataApi = await getDogsAPI();
    //Mapeo los temperamentos
    let temperaments = dataApi.map((element) => element.temperament);
    //Junto el array de temperamentos en un string y lo divido en un array
    temperaments = temperaments.join(', ').split(', ');
    //Filtro los vacios
    temperaments = temperaments.filter((element) => element);
    //Elimino los duplicados
    temperaments = [...new Set(temperaments)].sort();
    //Creo un nuevo temperamento en la tabla por cada elemento
    temperaments.forEach((element) => {
      Temperament.findOrCreate({
        where: { name: element },
      });
    });
    const allTemperament = await Temperament.findAll();
    res.status(200).send(allTemperament);
  } catch {
    res.status(404).send('Error');
  }
});

// - [X] __GET /dogs/{idRaza}:
// - Obtener el detalle de una raza de perro en particular
// - Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
// - Incluir los temperamentos asociados

router.get('/dogs/:idRaza', async (req, res) => {
  const { idRaza } = req.params;
  try {
    let dogId = await getAllDogs();
    if (dogId) {
      let foundDogId = await dogId.filter((dog) => dog.id == idRaza);
      foundDogId.length
        ? res.status(200).json(foundDogId)
        : res.status(404).send('Dog Id not existing');
    } else {
      res.status(404).send('Not found');
    }
  } catch (error) {
    res.status(404).send(error);
  }
});

// - [X] __POST /dog__:
// - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body
// - Crea una raza de perro en la base de datos

router.post('/dog', async (req, res) => {
  try {
    let {
      name,
      height_min,
      height_max,
      weight_min,
      weight_max,
      life_time_min,
      life_time_max,
      image,
      temperament,
    } = req.body;

    const newDog = await Dog.create({
      name,
      height_min,
      height_max,
      weight_min,
      weight_max,
      life_time_min,
      life_time_max,
      image,
    });

    let findTemperamentDB = await Temperament.findAll({
      where: { name: temperament },
    });

    newDog.addTemperament(findTemperamentDB); //agrego al perro creado el temperamento que selecciono el usuario
    res.send('Dog created successfully');
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
