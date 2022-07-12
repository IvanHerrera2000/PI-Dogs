import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { postDog, getTemperaments } from '../actions';
import styles from '../styles/DogCreate.module.css';

//VALIDACION DE ERRORES EN LOS INPUTS

function validate(input) {
  let errors = {};

  if (!input.name || !/^[A-Z]+[A-Za-z0-9\s]+$/g.test(input.name)) {
    errors.name = '❌ The first letter must be uppercase';
  } else {
    errors.name = '✅Done!';
  }

  if (!input.height_min || !/^[1-9]\d*(\.\d+)?$/.test(input.height_min)) {
    errors.height_min = '❌ Only numbers';
  } else {
    errors.height_min = '✅Done!';
  }

  if (!input.height_max || !/^[1-9]\d*(\.\d+)?$/.test(input.height_max)) {
    errors.height_max = '❌ Only numbers';
  } else {
    errors.height_max = '✅Done!';
  }

  if (input.height_max <= input.height_min) {
    errors.height_min = '❌ Min value cannot be greater than the max';
  }

  if (!input.weight_min || !/^[1-9]\d*(\.\d+)?$/.test(input.weight_min)) {
    errors.weight_min = '❌ Only numbers';
  }

  if (!input.weight_max || !/^[1-9]\d*(\.\d+)?$/.test(input.weight_max)) {
    errors.weight_max = '❌ Only numbers';
  }

  if (input.weight_max <= input.weight_min) {
    errors.weight_min = '❌ Min value cannot be greater than the max';
  }

  if (!input.life_time_min || !/^[1-9]\d*(\.\d+)?$/.test(input.life_time_min)) {
    errors.life_time_min = '❌ Only numbers';
  }

  if (!input.life_time_max || !/^[1-9]\d*(\.\d+)?$/.test(input.life_time_max)) {
    errors.life_time_max = '❌ Only numbers';
  }

  if (input.life_time_max <= input.life_time_min) {
    errors.life_time_min = '❌ Min value cannot be greater than the max';
  }

  if (
    input.img &&
    !/[a-z0-9-.]+\.[a-z]{2,4}\/?([^\s<>#%",{}\\|^[\]`]+)?$/.test(input.img)
  ) {
    errors.img = '❌ Must be an URL or be empty';
  }

  if (input.temperament.length <= 2) {
    errors.temperament = "❌ The dog can't have more than three temperaments!";
  }

  return errors;
}

function DogCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const temperaments = useSelector((state) => state.temperaments);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: '',
    height_min: '',
    height_max: '',
    weight_min: '',
    weight_max: '',
    life_time_min: '',
    life_time_max: '',
    temperament: [],
    img: '',
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.name,
      })
    );
  }

  function handleSelect(e) {
    if (input.temperament.length === 3) {
      alert("The dog can't have more than three temperaments!");
    } else if (input.temperament.length < 3) {
      setInput({
        ...input,
        temperament: [...input.temperament, e.target.value],
      });
    }
  }

  function handleDelete(el) {
    setInput({
      ...input,
      temperament: input.temperament.filter((e) => e !== el),
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      input.name !== '' &&
      input.height_min !== '' &&
      input.height_max > input.height_min &&
      input.weight_min !== '' &&
      input.weight_max > input.weight_min &&
      input.life_time_min !== '' &&
      input.weight_max > input.weight_min &&
      input.temperament.length !== 0
    ) {
      dispatch(postDog(input));
      alert('Done!');
      setInput({
        name: '',
        height_min: '',
        height_max: '',
        weight_min: '',
        weight_max: '',
        life_time_min: '',
        life_time_max: '',
        image: '',
        temperaments: [],
      });
      history.push('/home');
    } else {
      alert('Required elements are missing!');
    }
  }

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  return (
    <div>
      <Link to="/home">
        <button> Back to home</button>
      </Link>
      <h1>Create a new dog!</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <p>* : Required</p>
        {/*INPUTS*/}
        {/*Breed*/}
        <div>
          <label>*Breed:</label>
          <input
            type="text"
            value={input.name}
            name="name"
            id="name"
            required
            placeholder="Enter the breed..."
            onChange={(e) => handleChange(e)}
          />
          {/*Size*/}
          <div>
            <label>*Size:</label>
            <br />
            <div>
              <div>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={input.height_min}
                  name="height_min"
                  id="height_min"
                  required
                  placeholder="Min"
                  onChange={(e) => handleChange(e)}
                />
                cm.
              </div>
              <div>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={input.height_max}
                  name="height_max"
                  id="height_max"
                  required
                  placeholder="Max"
                  onChange={(e) => handleChange(e)}
                />
                cm.
              </div>
            </div>
          </div>
          {/*Weight*/}
          <div>
            <label>*Weight:</label>
            <br />
            <div>
              <div>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={input.weight_min}
                  name="weight_min"
                  id="weight_min"
                  required
                  placeholder="Min"
                  onChange={(e) => handleChange(e)}
                />
                kg.
              </div>
              <div>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={input.weight_max}
                  name="weight_max"
                  id="weight_max"
                  required
                  placeholder="Max"
                  onChange={(e) => handleChange(e)}
                />
                kg.
              </div>
            </div>
          </div>
          {/*Lifespan*/}
          <div>
            <label>*Lifespan:</label>
            <br />
            <div>
              <div>
                <input
                  min="1"
                  max="100"
                  type="number"
                  value={input.life_time_min}
                  name="life_time_min"
                  id="life_time_min"
                  required
                  placeholder="Min"
                  onChange={(e) => handleChange(e)}
                />{' '}
                year/s
              </div>
              <div>
                <input
                  min="1"
                  max="100"
                  type="number"
                  value={input.life_time_max}
                  name="life_time_max"
                  id="life_time_max"
                  required
                  placeholder="Max"
                  onChange={(e) => handleChange(e)}
                />{' '}
                year/s.
              </div>
            </div>
          </div>
          {/*Image*/}
          <label>Image:</label>
          <input
            type="imagen"
            value={input.image}
            name="image"
            placeholder="URL"
            onChange={(e) => handleChange(e)}
          />
          {/*Temperaments*/}
          <label>*Temperaments:</label>
          <select onChange={(e) => handleSelect(e)}>
            {temperaments.map((temperament) => (
              <option value={temperament.name} key={temperament.id}>
                {temperament.name}
              </option>
            ))}
          </select>
          <ul>
            <li>
              {input.temperament.map((element) => (
                <button key={element} onClick={() => handleDelete(element)}>
                  {element}
                </button>
              ))}
            </li>
          </ul>
        </div>

        <button type="submit">Create!</button>
      </form>
      <div>
        {errors.name && <p>{errors.name}</p>}
        {errors.height_min && <p>{errors.height_min}</p>}
        {errors.height_max && <p>{errors.height_max}</p>}
        {errors.weight_min && <p>{errors.weight_min}</p>}
        {errors.weight_max && <p>{errors.weight_max}</p>}
        {errors.life_time_min && <p>{errors.life_time_min}</p>}
        {errors.life_time_max && <p>{errors.life_time_max}</p>}
      </div>
    </div>
  );
}

export default DogCreate;
