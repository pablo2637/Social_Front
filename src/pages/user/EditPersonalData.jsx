import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { validateFormChangePassword, validateFormEditData } from '../../helpers/validateForm';
import { useAuthStore } from '../../hooks/useAuthStore';

export const EditPersonalData = () => {

  const { status, user, isChecking } = useSelector((state) => state.auth);

  const { updateUserData, updatePassword } = useAuthStore();
  const [form, setForm] = useState(user);
  const [validate, setValidate] = useState({});
  const navigate = useNavigate();



  const serializeForm = (serialForm) => {

    const data = {};
    const formData = new FormData(serialForm);


    for (let [key, value] of formData) {
      data[key] = typeof value === 'string' ? value.trim() : value.name;
    };


    return { data, formData };
  };



  const handleOnSubmit = async (ev, type = 'personal') => {
    ev.preventDefault();


    const { data, formData } = serializeForm(ev.target);


    let validateOK;
    if (type == 'personal')
      validateOK = validateFormEditData(data, setValidate);

    else
      validateOK = validateFormChangePassword(data, setValidate);

    if (!validateOK) return


    let response;

    if (type == 'personal')
      response = await updateUserData(formData);

    else
      response = await updatePassword(data, setValidate);

    if (!response.ok) return;


    if (type == 'personal')
      setValidate(prevValidate => ({
        ...prevValidate,
        msgError: 'Se actulizaron los datos correctamente.'
      }));

    else {
      ev.target.reset();
      
      setValidate(prevValidate => ({
        ...prevValidate,
        msgErrorPass: 'Se modificó la contraseña correctamente.'
      }));
    }


  };


  const handleOnChange = ({ target }) => {

    setForm(prevForm => ({
      ...prevForm,
      [target.name]: target.value
    }));

  };

  return (

    <section>

      <div>
        <NavLink to='/'>Tu cuenta</NavLink><span> &gt; Editar datos personales</span>
      </div>

      <h2>Edita tus datos personales:</h2>


      {validate.msgError &&
        <p className="errorEditData">{validate.msgError}</p>
      }


      <form encType='multipart/form-data' onSubmit={handleOnSubmit}>


        <input type="hidden" name="_id" value={user._id} />
        <input type="hidden" name="uid" value={user.uid} />


        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          autoComplete='off'
          name="name"
          id="name"
          autoFocus
          placeholder='Nombre...'
          value={form.name}
          onChange={handleOnChange}
        />
        {validate.name &&
          <p className="errorEditData">{validate.name}</p>
        }

        <label htmlFor="image">Elige tu foto:</label>
        <input type="hidden" name="imageURL" value={form.image} />
        <input
          type="file"
          name="image"
          id="image"
          onChange={handleOnChange}
        />
        {validate.image &&
          <p className="errorEditData">{validate.image}</p>
        }

        <input
          type="submit"
          value="Guardar Cambios"
        />

      </form>



      {validate.msgErrorPass &&
        <p className="errorEditData">{validate.msgErrorPass}</p>
      }

      <form encType='multipart/form-data' onSubmit={(ev) => handleOnSubmit(ev, 'password')}>


        <input type="hidden" name="_id" value={user._id} />
        <input type="hidden" name="uid" value={user.uid} />


        <label htmlFor="password">Contraseña Actual:</label>
        <input
          type="password"
          autoComplete='off'
          name="oldPassword"
          id="oldPassword"
          placeholder='Contraseña anterior...'
          onChange={handleOnChange}
        />
        {validate.password &&
          <p className="errorEditData">{validate.oldPassword}</p>
        }


        <label htmlFor="password">Nueva Contraseña:</label>
        <input
          type="password"
          autoComplete='off'
          name="password"
          id="password"
          placeholder='Nueva contraseña...'
          onChange={handleOnChange}
        />
        {validate.password &&
          <p className="errorEditData">{validate.password}</p>
        }

        <label htmlFor="passwordR">Repite la Contraseña Nueva:</label>
        <input
          type="password"
          name="passwordR"
          id="passwordR"
          placeholder='Repite la contraseña nueva...'
          onChange={handleOnChange}
        />
        {validate.passwordR &&
          <p className="errorEditData">{validate.passwordR}</p>
        }

        <input
          type="submit"
          value="Cambiar Contraseña"
        />


      </form>

      <NavLink to='/'>Volver a la pantalla principal</NavLink>
    </section>

  );
};
