import { useEffect, useState } from "react";
import { useUserStore } from "../../hooks/useUserStore";
import { useSelector } from "react-redux";
import { Profile } from "./components/Profile";
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { validateFormProfile } from "../../helpers/validateForm";

export const EditPrivateProfile = () => {

    const { user } = useSelector((state) => state.auth);
    const { updateUserPrivateProfile } = useUserStore();
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

        const response = await updateUserPrivateProfile(formData);

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

        setOrder(user.privateProfileOrder);
        const newForm = [...user.privateProfile];

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

            <h2>Edita tu perfil Privado:</h2>

            {validate &&
                <p className="errorProfile">{validate}</p>
            }

            <form onSubmit={handleOnSubmit}>
                <input type="hidden" name="_id" value={user._id} />
                <input type="hidden" name="uid" value={user.uid} />
                <input type="hidden" name="privateProfileOrder" value={order} />


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
                <div>
                    <button onClick={() => handleOnClick('title')} >+ Título</button>
                    <button onClick={() => handleOnClick('text')} >+ Texto</button>
                    <button onClick={() => handleOnClick('paragraph')} >+ Párrafo</button>
                    <button onClick={() => handleOnClick('image')} >+ Imagen</button>
                </div>

                {
                    (form.length == 0) ?
                        <input type="submit" disabled={true} value="Guardar" />
                        :
                        <input type="submit" value="Guardar" />
                }

                {
                    (user.privateProfile.length > 0) && <NavLink to='/'>Cancelar</NavLink>
                }
            </form>


            <h2>Previsualización:</h2>

            <Profile profile={form} />

        </section>

    )
}
