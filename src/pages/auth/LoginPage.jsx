import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useAuthStore } from '../../hooks/useAuthStore';
import { validateFormLogin } from '../../helpers/validateForm';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * @author Pablo
 * @module HomePageAdmin
 */

/**
 * Pagina de login de usuarios
 * @method LoginPage
 * @returns La página para realizar el login
 */
export const LoginPage = () => {

  const { loginUser, loginGoogle } = useAuthStore();

  const { status, user, isChecking } = useSelector((state) => state.auth);
  const [form, setForm] = useState({});
  const [validate, setValidate] = useState({});
  const navigate = useNavigate();



  const serializeForm = (serialForm) => {

    const data = {};
    const formData = new FormData(serialForm);

    for (let [key, value] of formData) {
      data[key] = typeof value === 'string' ? value.trim() : value.name;
    }

    return data;
  };



  const handleOnLoginGoogle = async (ev) => {
    ev.preventDefault();

    await loginGoogle();

    if (status === 'authenticated') navigate('/');


  };



  const handleOnSubmit = async (ev) => {
    ev.preventDefault();

    const data = serializeForm(ev.target);

    const validateOK = validateFormLogin(data, setValidate);
    if (!validateOK) return;


    const response = await loginUser(data, setValidate);
    if (!response.ok) return;

    navigate('/');

  };


  const handleOnChange = ({ target }) => {

    setForm(prevForm => ({
      ...prevForm,
      [target.name]: target.value
    }));

  };


  return (

    <section className='secLogin'>

      <h2>Loguéate para continuar:</h2>


      <div className='divContainer'>

        <form encType="multipart/form-data" onSubmit={handleOnSubmit}>

          {/* <label htmlFor="email">Email:</label> */}
          <input
            type="text"
            autoComplete='off'
            autoFocus
            name="email"
            id="email"
            placeholder='Email...'
            onChange={handleOnChange}
          />
          {validate.email &&
            <p className="errorLogin">{validate.email}</p>
          }

          {/* <label htmlFor="password">Contraseña:</label> */}
          <input
            type="password"
            autoComplete='off'
            name="password"
            id="password"
            placeholder='Contraseña...'
            onChange={handleOnChange}
          />
          {validate.password &&
            <p className="errorLogin">{validate.password}</p>
          }

          <input
            type="submit"
            value="Entrar"
          />

        </form>


        <div className='divGoogle'>

          <button
            onClick={handleOnLoginGoogle}
          ><i className="fa-brands fa-google"></i> Entra con tu cuenta de Google</button>

          <p>Aún no tienes una cuenta? <NavLink to='/register'>Regístrate</NavLink></p>

        </div>

        {(isChecking) &&
          < span className="loader"></span>
        }


        {validate.msgError &&
          <p className="errorForm">{validate.msgError}</p>
        }


      </div>

    </section >

  );
};
