import { useSelector } from "react-redux";

export const Profile = ({ profile }) => {

    // const { profile,
    //     isLoading,
    //     userStatus } = useSelector((state) => state.user);

    // const { status, user, isChecking } = useSelector((state) => state.auth);

    return (
        <section>
            
            {
                (profile.length > 0)                    ?
                    <h2>Así se ve tu perfil:</h2>
                    :
                    <h2>Añade contenido a tu perfil:</h2>
            }


            {
                profile.map(el => (
                    <>
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
                            <div className="imageContainer">
                                <img
                                    key={'i' + el.id}
                                    name={'i' + el.name}
                                    id={'i' + el.id}
                                    src={el.content}
                                    width={150}
                                />
                            </div>
                        }

                    </>
                ))
            }

        </section>
    );
};
