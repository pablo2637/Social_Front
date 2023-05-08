import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { validateFormChangePassword, validateFormEditData } from '../user/helpers/validateFormUser';
import { useAuthStore } from '../../hooks/useAuthStore';

export const EditPersonalData = () => {

  const { user, isLoading } = useSelector((state) => state.auth);

  const { updateUserData, updatePassword } = useAuthStore();
  const [form, setForm] = useState(user);
  const [validate, setValidate] = useState({});

  const serializeForm = (serialForm) => {

    const data = {};
    const formData = new FormData(serialForm);

    for (let [key, value] of formData) {

      if (value.length > 1000)
        delete data.key

      else
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
        msgError: 'Se actualizaron los datos correctamente.'
      }));

    else {
      ev.target.reset();

      setValidate(prevValidate => ({
        ...prevValidate,
        msgErrorPass: 'Se modificó la contraseña correctamente.'
      }));
    }

    setTimeout(() => {

      setValidate({});
    }, 5000);


  };


  const handleOnChange = ({ target }) => {

    setForm(prevForm => ({
      ...prevForm,
      [target.name]: target.value
    }));

  };

  return (

    <section className='secEditPersonalData'>

      <div className='divRoot'>
        <NavLink to='/'>&gt; Tu cuenta</NavLink><span> &gt; Edita tu info:</span>
      </div>

      <h2>Edita tus datos personales:</h2>


      {validate.msgError &&
        <p className="errorEditData">{validate.msgError}</p>
      }


      <div className='divContainer'>

        <h3>Nombre e Imagen:</h3>

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

          <label className='labelImg' htmlFor="imageURL">Foto elegida:</label>
          <input
            type="text"
            name="imageURL"
            id="imageURL"
            onChange={handleOnChange}
            value={(form.image.length < 1000) ? form.image : '...'}
          />
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
            disabled={(isLoading) ? true : false}
            type="submit"
            value="Guardar Cambios"
          />

        </form>


        {
          (isLoading) &&
          < span className="loader"></span>
        }

      </div>



      {validate.msgErrorPass &&
        <p className="errorEditData">{validate.msgErrorPass}</p>
      }

      <div className='divContainer'>

        <h3>Contraseña:</h3>
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
            disabled={(isLoading) ? true : false}
            type="submit"
            value="Cambiar Contraseña"
          />

        </form>

        {
          (isLoading) &&
          < span className="loader"></span>
        }

      </div>

    </section>

  );
};
