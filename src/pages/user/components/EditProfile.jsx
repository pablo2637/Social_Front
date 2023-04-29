import { useState } from "react";
import { useUserStore } from "../../../hooks/useUserStore";
import { useSelector } from "react-redux";
import { Profile } from "./Profile";

export const EditProfile = () => {

    const { status, user, isChecking } = useSelector((state) => state.auth);
    const { isLoading, friends, profile, userStatus } = useSelector((state) => state.user);
    const { updateUserProfile } = useUserStore();
    const [form, setForm] = useState([]);
    const [order, setOrder] = useState([]);


    const serializeForm = (serialForm) => {

        const data = {};
        const formData = new FormData(serialForm);

        for (let [key, value] of formData) {
            data[key] = typeof value === 'string' ? value.trim() : value;
        }

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

        const newInput = form.find(el => el.id == target.id);
        const newForm = form.filter(el => el.id != target.id);

        const reader = new FileReader();
        reader.onload = ({ target }) => {

            newInput.content = target.result

            setForm(([
                ...newForm,
                newInput
            ]));
        };

        reader.readAsDataURL(target.files[0]);

    };



    const handleOnSubmit = async (ev) => {
        ev.preventDefault();


        const { data, formData } = serializeForm(ev.target);

        // const validateOK = validateFormRegister(data, setValidate);
        // if (!validateOK) return


        const response = await updateUserProfile(formData);

        console.log('response 2', response)

    };



    const handleOnChange = (target) => {

        const newInput = form.find(el => el.id == target.id);
        const newForm = form.filter(el => el.id != target.id);

        newInput.content = target.value;

        setForm(([
            ...newForm,
            newInput
        ]));

    };

    return (

        <section>

            <h2>Edita tu perfil:</h2>

            <p>Status: {userStatus} - isChecking: {isLoading.toString()} - profile: {profile.toString()}</p>

            <div>
                <button onClick={() => handleOnClick('text')} >+ Texto</button>
                <button onClick={() => handleOnClick('image')} >+ Imagen</button>
                <button onClick={() => handleOnClick('title')} >+ Título</button>
                <button>+ Video</button>
            </div>


            <form onSubmit={handleOnSubmit}>
                <input type="hidden" name="_id" value={user._id} />
                <input type="hidden" name="uid" value={user.uid} />
                <input type="hidden" name="profileOrder" value={order} />

                {
                    form.map(el => (
                        <>
                            {(el.typeInput == 'text') && <input
                                key={el.id}
                                type="text"
                                name={el.name}
                                id={el.id}
                                value={el.content}
                                placeholder='Texto...'
                                onChange={({ target }) => handleOnChange(target, el.typeInput)}
                            />}

                            {(el.typeInput == 'title') && <input
                                key={el.id}
                                type="text"
                                name={el.name}
                                id={el.id}
                                value={el.content}
                                placeholder='Titulo...'
                                onChange={({ target }) => handleOnChange(target, el.typeInput)}
                            />}

                            {(el.typeInput == 'image') && <input
                                key={el.id}
                                type="file"
                                accept="image/*"
                                name={el.name}
                                id={el.id}
                                onChange={handleImageSelect}
                            />}

                        </>
                    ))
                }

                {
                    (form.length == 0) ?
                        <input type="submit" disabled={true} value="Guardar" />
                        :
                        <input type="submit" value="Guardar" />
                }

            </form>


            <Profile profile={form} />


        </section>

    )
}
