import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Profile } from "./components/Profile";
import { NavLink } from 'react-router-dom';
import { useProfiles } from "./hooks/useProfiles";

export const EditPrivateProfile = () => {

    const { user } = useSelector((state) => state.auth);
    const { isLoading } = useSelector((state) => state.users);

    const {
        form,
        handleImageSelect,
        handleOnChange,
        handleOnClick,
        handleOnSubmit,

        loadFormPrivate,

        order,
        validate,

        handleMoveDown,
        handleMoveUp,
        handleRemove
    } = useProfiles();


    useEffect(() => {
        loadFormPrivate();

    }, [])


    return (

        <section className="secEditProfile">

            <div className='divRoot'>
                <NavLink to='/'>&gt; Tu cuenta</NavLink><span> &gt; Editar perfil</span>
            </div>

            <h2>Edita tu perfil Privado:</h2>

            <div className="imgContainer">
                <img src="../../assets/bg-chat.png" alt="Imagen de portada de perfiles" />
            </div>


            <form onSubmit={(ev) => handleOnSubmit(ev, true)}>
                <input type="hidden" name="_id" value={user._id} />
                <input type="hidden" name="uid" value={user.uid} />
                <input type="hidden" name="privateProfileOrder" value={order} />


                {
                    form.map(el => (
                        <div key={`d${el.id}`}>
                            {
                                (el.typeInput == 'title') &&
                                <div className="divElProfile">

                                    <label htmlFor={el.name}>Título:</label>
                                    <input
                                        className="btnTitle"
                                        type="text"
                                        name={el.name}
                                        id={el.id}
                                        value={el.content}
                                        placeholder='Titulo...'
                                        onChange={({ target }) => handleOnChange(target, el.typeInput)}
                                    />

                                    <div>
                                        <button onClick={(ev) => handleMoveUp(ev, el.id)}><i className="fa-solid fa-up-long"></i></button>
                                        <button onClick={(ev) => handleRemove(ev, el.id)}><i className="fa-solid fa-trash"></i></button>
                                        <button onClick={(ev) => handleMoveDown(ev, el.id)}><i className="fa-solid fa-down-long"></i></button>
                                    </div>
                                </div>
                            }

                            {
                                (el.typeInput == 'text') &&
                                <div className="divElProfile">

                                    <label htmlFor={el.name}>Texto:</label>
                                    <input
                                        className="btnText"
                                        type="text"
                                        name={el.name}
                                        id={el.id}
                                        value={el.content}
                                        placeholder='Texto...'
                                        onChange={({ target }) => handleOnChange(target, el.typeInput)}
                                    />

                                    <div>
                                        <button onClick={(ev) => handleMoveUp(ev, el.id)}><i className="fa-solid fa-up-long"></i></button>
                                        <button onClick={(ev) => handleRemove(ev, el.id)}><i className="fa-solid fa-trash"></i></button>
                                        <button onClick={(ev) => handleMoveDown(ev, el.id)}><i className="fa-solid fa-down-long"></i></button>
                                    </div>
                                </div>
                            }

                            {(el.typeInput == 'paragraph') &&
                                <div className="divElProfile">

                                    <label htmlFor={el.name}>Párrafo:</label>
                                    <textarea
                                        className="btnParagraph"
                                        name={el.name}
                                        id={el.id}
                                        placeholder='Párrafo...'
                                        onChange={({ target }) => handleOnChange(target, el.typeInput)}
                                        defaultValue={el.content}>
                                    </textarea>

                                    <div>
                                        <button onClick={(ev) => handleMoveUp(ev, el.id)}><i className="fa-solid fa-up-long"></i></button>
                                        <button onClick={(ev) => handleRemove(ev, el.id)}><i className="fa-solid fa-trash"></i></button>
                                        <button onClick={(ev) => handleMoveDown(ev, el.id)}><i className="fa-solid fa-down-long"></i></button>
                                    </div>
                                </div>
                            }

                            {(el.typeInput == 'image') &&

                                <>

                                    <div className="divElProfileSel">
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
                                    </div>

                                    <div className="divElProfile">

                                        <label htmlFor={el.name}>Imagen:</label>
                                        <input
                                            className="btnImg"
                                            type="file"
                                            accept="image/*"
                                            name={el.name}
                                            id={el.id}
                                            onChange={handleImageSelect}
                                        />

                                        <div>
                                            <button onClick={(ev) => handleMoveUp(ev, el.id)}><i className="fa-solid fa-up-long"></i></button>
                                            <button onClick={(ev) => handleRemove(ev, el.id)}><i className="fa-solid fa-trash"></i></button>
                                            <button onClick={(ev) => handleMoveDown(ev, el.id)}><i className="fa-solid fa-down-long"></i></button>
                                        </div>
                                    </div>
                                </>
                            }

                        </div>
                    ))
                }


                <div className="divBtnsForm">

                    <p>Agregar elemento:</p>
                    <div>
                        <button className="btnTitle" onClick={(ev) => handleOnClick(ev, 'title')} ><i className="fa-solid fa-t"></i> Título</button>
                        <button className="btnParagraph" onClick={(ev) => handleOnClick(ev, 'paragraph')} ><i className="fa-solid fa-paragraph"></i> Párrafo</button>
                        <button className="btnText" onClick={(ev) => handleOnClick(ev, 'text')} ><i className="fa-solid fa-i-cursor"></i> Texto</button>
                        <button className="btnImg" onClick={(ev) => handleOnClick(ev, 'image')} ><i className="fa-regular fa-image"></i>Imagen</button>
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
                        (user.privateProfile.length > 0) && <NavLink to='/'>Cancelar</NavLink>
                    }
                </div>

                {
                    (isLoading) &&
                    < span className="loader"></span>
                }
            </form>

            {validate &&
                <p className="errorProfile">{validate}</p>
            }

            <h2>Previsualización:</h2>

            <Profile profile={form} />

        </section>

    )
}
