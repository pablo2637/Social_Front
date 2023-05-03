
export const Profile = ({ profile, _id = Date.now(), name, dateMod }) => {

    return (
        <section key={'sec' + _id}>

            {(name) &&
                <>
                    <h2>{name}</h2>
                    <p>Ult. mod.: {dateMod}</p>
                </>
            }

            {
                (profile.length > 0) ?

                    profile.map(el => (
                        <article key={'a' + el.id}>

                            {(el.typeInput == 'text') &&
                                <p
                                    name={'p' + el.name}
                                    id={'p' + el.id}
                                >{el.content}
                                </p>}


                            {(el.typeInput == 'title') &&
                                <h3
                                    name={'t' + el.name}
                                    id={'t' + el.id}
                                >{el.content}
                                </h3>}

                            {(el.typeInput == 'paragraph') &&
                                <textarea
                                    name={'g' + el.name}
                                    id={'g' + el.id}
                                    defaultValue={el.content}>
                                </textarea>}


                            {(el.typeInput == 'image') &&
                                <div key={'d' + el.id} className="imageContainer">
                                    <img
                                        name={'i' + el.name}
                                        id={'i' + el.id}
                                        src={el.content}
                                        width={150}
                                    />
                                </div>
                            }

                        </article>
                    ))

                    :

                    (name) && <h3>Pendiente de crear perfil...</h3>

            }

        </section>
    );
};
