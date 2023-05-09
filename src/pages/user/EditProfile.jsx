import { useEffect, useState } from "react";
import { useUserStore } from "../../hooks/useUserStore";
import { useSelector } from "react-redux";
import { Profile } from "./components/Profile";
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { validateFormProfile } from "../../helpers/validateForm";

export const EditProfile = () => {

    const { user } = useSelector((state) => state.auth);
    const { isLoading } = useSelector((state) => state.users);

    const { updateUserProfile } = useUserStore();

    const [form, setForm] = useState([]);
    const [order, setOrder] = useState([]);
    const [validate, setValidate] = useState('');
    const navigate = useNavigate();


    const serializeForm = (serialForm) => {

        const data = {};
        const formData = new FormData(serialForm);

        for (let [key, value] of formData) {

            if (value.length > 1000)
                delete data.key

            else
                data[key] = typeof value === 'string' ? value.trim() : value;
        };

        return { data, formData };
    };



    const handleOnClick = (type) => {

        const id = Date.now();

        setForm(prevForm => ([
            ...prevForm,
            {
                typeInput: type,
                content: '',
                name: `${type}-${id}`,
                id: `${type}-${id}`
            }
        ]));

        setOrder([
            ...order,
            `${type}-${id}`
        ])

    };



    const handleImageSelect = ({ target }) => {

        const ind = form.findIndex(el => el.id == target.id);
        const newInput = form[ind];

        const reader = new FileReader();
        reader.onload = ({ target }) => {

            const newForm = [
                ...form.slice(0, ind),
                { ...newInput, content: target.result },
                ...form.slice(ind + 1)
            ];
            setForm(newForm);
        };
        reader.readAsDataURL(target.files[0]);
    };



    const handleOnSubmit = async (ev) => {
        ev.preventDefault();


        const { data, formData } = serializeForm(ev.target);

        const validateOK = validateFormProfile(data);
        if (!validateOK) {
            setValidate('No puedes dejar campos vacíos...');

            setTimeout(() => {
                setValidate('');
            }, 3000)
            return
        }

        if (!data) {
            setValidate('Tienes que agregar aunque sea 1 elemtento para continuar...');

            setTimeout(() => {
                setValidate('');
            }, 3000)
            return
        }

        const response = await updateUserProfile(formData);
        if (!response.ok) return

        navigate('/');

    };


    const handleOnChange = (target) => {

        setForm((prevForm) =>
            prevForm.map((el) => {
                if (el.id === target.id)
                    return { ...el, content: target.value };

                return el;
            })
        );

    };


    const loadForm = () => {

        setOrder(user.profileOrder);
        const newForm = [...user.profile];

        setForm(newForm);
    };


    useEffect(() => {
        loadForm();

    }, [])


    return (

        <section className="secEditProfile">

            <div className='divRoot'>
                <NavLink to='/'>&gt; Tu cuenta</NavLink><span> &gt; Editar perfil</span>
            </div>

            <h2>Edita tu perfil Público:</h2>


            <div>
                <img src="../../assets/bg-chat.png" alt="Imagen de portada de perfiles" />
            </div>

            {validate &&
                <p className="errorProfile">{validate}</p>
            }

            <form onSubmit={handleOnSubmit}>
                <input type="hidden" name="_id" value={user._id} />
                <input type="hidden" name="uid" value={user.uid} />
                <input type="hidden" name="profileOrder" value={order} />


                {
                    form.map(el => (
                        <div key={`d${el.id}`}>
                            {(el.typeInput == 'title') && <input
                                type="text"
                                name={el.name}
                                id={el.id}
                                value={el.content}
                                placeholder='Titulo...'
                                onChange={({ target }) => handleOnChange(target, el.typeInput)}
                            />}

                            {(el.typeInput == 'text') && <input
                                type="text"
                                name={el.name}
                                id={el.id}
                                value={el.content}
                                placeholder='Texto...'
                                onChange={({ target }) => handleOnChange(target, el.typeInput)}
                            />}

                            {(el.typeInput == 'paragraph') && <textarea
                                name={el.name}
                                id={el.id}
                                placeholder='Párrafo...'
                                onChange={({ target }) => handleOnChange(target, el.typeInput)}
                                defaultValue={el.content}>
                            </textarea>}

                            {(el.typeInput == 'image') &&
                                <>
                                    <label
                                        htmlFor={`${el.name}_imageURL`}
                                    >Imagen elegida:
                                    </label>
                                    <input
                                        type="text"
                                        className="selected"
                                        readOnly
                                        name={`${el.name}_imageURL`}
                                        value={(el.content.length < 1000) ? el.content : '...'}
                                        placeholder="Aún sin seleccionar..."
                                    />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        name={el.name}
                                        id={el.id}
                                        onChange={handleImageSelect}
                                    />
                                </>}

                        </div>
                    ))
                }


                <div className="divBtnsForm">

                    <p>Agregar elemento:</p>
                    <div>
                        <button onClick={() => handleOnClick('title')} ><i className="fa-solid fa-t"></i> Título</button>
                        <button onClick={() => handleOnClick('paragraph')} ><i className="fa-solid fa-paragraph"></i> Párrafo</button>
                        <button onClick={() => handleOnClick('text')} ><i className="fa-solid fa-i-cursor"></i> Texto</button>
                        <button onClick={() => handleOnClick('image')} ><i className="fa-regular fa-image"></i>Imagen</button>
                    </div>
                </div>

                <div className="divSubmit">
                    {
                        (form.length == 0) ?
                            <input
                                type="submit"
                                disabled={true}
                                value="Guardar" />
                            :
                            <input
                                disabled={(isLoading) ? true : false}
                                type="submit"
                                value="Guardar" />
                    }

                    {
                        (user.profile.length > 0) && <NavLink to='/'>Cancelar</NavLink>
                    }
                </div>
                {
                    (isLoading) &&
                    < span className="loader"></span>
                }
            </form>


            <h2>Previsualización:</h2>

            <Profile profile={form} />

        </section>

    )
}
