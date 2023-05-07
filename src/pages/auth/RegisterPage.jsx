import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useAuthStore } from '../../hooks/useAuthStore';
import { validateFormRegister } from '../../helpers/validateForm';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


/**
 * @author Pablo
 * @module RegisterPage
 */

/**
 * Pagina de registro de usuarios
 * @metod RegisterPage
 * @returns La página para realizar el registro de un nuevo usuario
 */
export const RegisterPage = () => {


    const { status, user, isChecking } = useSelector((state) => state.auth);
    const { registerUser, loginGoogle } = useAuthStore();
    const [form, setForm] = useState({});
    const [validate, setValidate] = useState({});
    const navigate = useNavigate();


    const serializeForm = (serialForm) => {

        const data = {};
        const formData = new FormData(serialForm);

        for (let [key, value] of formData) {
            data[key] = typeof value === 'string' ? value.trim() : value;
        };

        return { data, formData };
    };



    const handleOnLoginGoogle = async (ev) => {
        ev.preventDefault();

        await loginGoogle();

        if (status === 'authenticated') navigate('/');


    };



    const handleOnSubmit = async (ev) => {
        ev.preventDefault();

        const { data, formData } = serializeForm(ev.target);

        const validateOK = validateFormRegister(data, setValidate);
        if (!validateOK) return

        const response = await registerUser(formData, data, setValidate);

        if (!response.ok) {
            setForm(prevValidate => ({
                ...prevValidate,
                msgError: response
            }));
            return;
        }

        navigate('/');
    };


    const handleOnChange = ({ target }) => {

        setForm(prevForm => ({
            ...prevForm,
            [target.name]: target.value
        }));

    };


    return (

        <section className='secRegister'>

            <h2>Regístrate para continuar:</h2>


            <div className='divContainer'>


                <form encType='multipart/form-data' onSubmit={handleOnSubmit}>
                    {/* <label htmlFor="name">Nombre:</label> */}
                    <input
                        type="text"
                        autoComplete='off'
                        name="name"
                        id="name"
                        autoFocus
                        placeholder='Nombre...'
                        onChange={handleOnChange}
                    />
                    {validate.name &&
                        <p className="errorRegister">{validate.name}</p>
                    }


                    {/* <label htmlFor="email">Email:</label> */}
                    <input
                        type="text"
                        autoComplete='off'
                        name="email"
                        id="email"
                        placeholder='Email...'
                        onChange={handleOnChange}
                    />
                    {validate.email &&
                        <p className="errorRegister">{validate.email}</p>
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
                        <p className="errorRegister">{validate.password}</p>
                    }

                    {/* <label htmlFor="passwordR">Repite la Contraseña:</label> */}
                    <input
                        type="password"
                        name="passwordR"
                        id="passwordR"
                        placeholder='Repite la contraseña...'
                        onChange={handleOnChange}
                    />
                    {validate.passwordR &&
                        <p className="errorRegister">{validate.passwordR}</p>
                    }

                    {/* <label htmlFor="image">Elige tu foto:</label> */}
                    <input
                        type="file"
                        name="image"
                        id="image"
                        onChange={handleOnChange}
                    />
                    {validate.image &&
                        <p className="errorRegister">{validate.image}</p>
                    }

                    <div className='divFormBtns'>
                        <input
                            type="submit"
                            value="Registrarme"
                        />

                        <input
                            type="reset"
                            value="Comenzar de nuevo"
                        />
                    </div>


                    <div className='divGoogle'>

                        <button
                            onClick={handleOnLoginGoogle}
                        ><i className="fa-brands fa-google"></i> Regístrate con tu cuenta de Google</button>

                        <p>Ya tienes una cuenta? <NavLink to='/login'>Loguéate</NavLink></p>

                    </div>



                </form>


                {(isChecking) &&
                    < span className="loader"></span>
                }


                {validate.msgError &&
                    <p className="errorForm">{validate.msgError}</p>
                }

            </div>

        </section>
    )
}
