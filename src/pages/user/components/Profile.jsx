
export const Profile = ({ profile, _id = Date.now(), name, email }) => {

    return (
        <section key={'sec' + _id}>

            {(name) && <h2>{name}</h2>}

            {
                (profile.length > 0) ?

                    profile.map(el => (
                        <article key={'a' + el.id}>

                            {(el.typeInput == 'text') &&
                                <p
                                    key={'p' + el.id}
                                    name={'p' + el.name}
                                    id={'p' + el.id}
                                >{el.content}
                                </p>}


                            {(el.typeInput == 'title') &&
                                <h3
                                    key={'t' + el.id}
                                    name={'t' + el.name}
                                    id={'t' + el.id}
                                >{el.content}
                                </h3>}


                            {(el.typeInput == 'image') &&
                                <div key={'d' + el.id} className="imageContainer">
                                    <img
                                        key={'i' + el.id}
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
