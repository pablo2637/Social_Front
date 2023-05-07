import { useSelector } from "react-redux";

export const Profile = ({ profile, _id = Date.now(), name, dateMod }) => {

    const { profiles, isLoading, userStatus } = useSelector((state) => state.users);


    return (
        <section className="secProfile" key={'sec' + _id}>

            {(name) &&
                <div className="divName">
                    <h3>{name}</h3>
                    <p className="pDate">Ult. mod.: {dateMod}</p>
                </div>
            }

            <div className="divProfile">
                {
                    (profile.length > 0) ?

                        profile.map(el => (
                            <article key={'a' + el.id}>

                                {(el.typeInput == 'text') &&
                                    <p
                                        className="pText"
                                        name={'p' + el.name}
                                        id={'p' + el.id}
                                    >{el.content}
                                    </p>}


                                {(el.typeInput == 'title') &&
                                    <p
                                        className="pTitle"
                                        name={'t' + el.name}
                                        id={'t' + el.id}
                                    >{el.content}
                                    </p>}

                                {(el.typeInput == 'paragraph') &&
                                    <p
                                        className="pParagraph"
                                        name={'g' + el.name}
                                        id={'g' + el.id}
                                    >{`"${el.content}"`}
                                    </p>}


                                {(el.typeInput == 'image') &&
                                    <div key={'d' + el.id} className="divImageContainer">
                                        <img
                                            name={'i' + el.name}
                                            id={'i' + el.id}
                                            src={(isLoading) ? '../../../assets/no-pic.png' : el.content}
                                        />
                                    </div>
                                }

                            </article>
                        ))

                        :

                        (name) && <h3>Pendiente de crear perfil...</h3>

                }
            </div>

        </section>
    );
};
