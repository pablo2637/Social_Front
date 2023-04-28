import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useAuthStore } from '../../hooks/useAuthStore';
import { validateFormLogin } from '../../helpers/validateForm';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {


  const { status, loginUser, loginGoogle } = useAuthStore();
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



  const handleLoginGoogle = async (ev) => {
    ev.preventDefault();

    await loginGoogle();

    if (status === 'authenticated') navigate('/');

  };



  const handleSubmit = async (ev) => {
    ev.preventDefault();

    const data = serializeForm(ev.target);

    const validateOK = validateFormLogin(data, setValidate);
    if (!validateOK) return;


    const response = await loginUser(data, setValidate);
    if (!response.ok) return;

    navigate('/');

  };


  const handleChange = ({ target }) => {

    setForm(prevForm => ({
      ...prevForm,
      [target.name]: target.value
    }));

  };


  return (

    <section>

      <h2>Login</h2>


      {validate.msgError &&
        <p className="errorLogin">ERROR: {validate.msgError}</p>
      }

      <form encType="multipart/form-data" onSubmit={handleSubmit}>

        <label htmlFor="email">Email:</label>
        <input
          type="text"
          autoComplete='off'
          autoFocus
          name="email"
          id="email"
          placeholder='Email...'
          onChange={handleChange}
        />
        {validate.email &&
          <p className="errorLogin">{validate.email}</p>
        }

        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          autoComplete='off'
          name="password"
          id="password"
          placeholder='Contraseña...'
          onChange={handleChange}
        />
        {validate.password &&
          <p className="errorLogin">{validate.password}</p>
        }

        <input
          type="submit"
          value="Entrar"
        />

        <p>Aún no tienes una cuenta? <NavLink to='/register'>Regístrate</NavLink></p>

        <button
          onClick={handleLoginGoogle}
        >Entra con tu cuenta de Google</button>

      </form>

    </section>

  );
};
