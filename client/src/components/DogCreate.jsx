import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { postDog, getTemperaments } from '../actions';
import styles from '../styles/DogCreate.module.css';

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

  //VALIDACION DE ERRORES EN LOS INPUTS
  const validate = function (input) {
    const error = {};
    if (!input.name) {
      error.name = 'Name is required';
    }
    if (!input.height_min) {
      error.height_min = 'Height Min is required';
    }
    if (input.height_min < 0) {
      error.height_min = 'Height Min must be greater than 0';
    }
    if (!input.height_max) {
      error.height_max = 'Height Max is required';
    }
    if (!input.weight_min) {
      error.weight_min = 'Weight Min is required';
    }
    if (input.weight_min < 0) {
      error.weight_min = 'Weight Min must be greater than 0';
    }
    if (!input.weight_max) {
      error.weight_max = 'Height Max is required';
    }
    if (!input.life_time_max) {
      error.weight_max = 'Life Time Max is required';
    }
    if (!input.life_time_min) {
      error.weight_max = 'Life Time Min is required';
    }

    if (Number(input.height_max) < Number(input.height_min)) {
      error.height_max = 'Height Min must be less than Height Max';
    }
    if (Number(input.weight_min) > Number(input.weight_max)) {
      error.weight_min = 'Weight Min must be less than Weight Max';
    }
    if (Number(input.life_time_min) > Number(input.life_time_max)) {
      error.weight_min = 'Life Time Min must be less than Life Time Max';
    }

    return error;
  };

  function handleChange(e) {
    e.preventDefault();
    setInput((input) => {
      const newInput = {
        ...input,
        [e.target.name]: e.target.value,
      };
      const error = validate(newInput);
      setErrors(error);
      return newInput;
    });
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

        <button
          type="submit"
          disabled={Object.keys(errors).length > 0 ? true : false}
        >
          Create Dog
        </button>
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
