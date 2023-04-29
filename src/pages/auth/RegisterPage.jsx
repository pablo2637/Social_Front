import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useAuthStore } from '../../hooks/useAuthStore';
import { validateFormRegister } from '../../helpers/validateForm';
import { useNavigate } from 'react-router-dom';


export const RegisterPage = () => {


    const { registerUser } = useAuthStore();
    const [form, setForm] = useState({});
    const [validate, setValidate] = useState({});
    const navigate = useNavigate();


    const serializeForm = (serialForm) => {

        const data = {};
        const formData = new FormData(serialForm);

        for (let [key, value] of formData) {
            data[key] = typeof value === 'string' ? value.trim() : value;
        }
        console.log('data', data)

        return { data, formData };
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

        <section>

            <h2>Registro</h2>


            {validate.msgError &&
                <p className="errorRegister">ERROR: {validate.msgError}</p>
            }


            <form encType='multipart/form-data' onSubmit={handleOnSubmit}>
                <label htmlFor="name">Nombre:</label>
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
                {/* 
                <label htmlFor="lastName">Apellidos:</label>
                <input
                    type="text"
                    autoComplete='off'
                    name="lastName"
                    id="lastName"
                    placeholder='Apellidos...'
                    onChange={handleChange}
                />
                {validate.lastName &&
                    <p className="errorRegister">{validate.lastName}</p>
                } */}

                <label htmlFor="email">Email:</label>
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

                <label htmlFor="password">Contraseña:</label>
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

                <label htmlFor="passwordR">Repite la Contraseña:</label>
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

                <label htmlFor="image">Elige tu foto:</label>
                <input
                    type="file"
                    name="image"
                    id="image"
                    onChange={handleOnChange}
                />
                {validate.image &&
                    <p className="errorRegister">{validate.image}</p>
                }

                {/* <label htmlFor="dateOfBirth">Fecha de Nacimiento:</label>
                <input
                    type="date"
                    name="dateOfBirth"
                    id="dateOfBirth"
                    placeholder='Fecha de nacimiento...'
                    onChange={handleChange}
                />
                {validate.dateOfBirth &&
                    <p className="errorRegister">{validate.dateOfBirth}</p>
                } */}

                <input
                    type="submit"
                    value="Registrarme"
                />

                <input
                    type="reset"
                    value="Comenzar de nuevo"
                />

                <p>Ya tienes una cuenta? <NavLink to='/login'>Loguéate</NavLink></p>


            </form>

        </section>
    )
}
