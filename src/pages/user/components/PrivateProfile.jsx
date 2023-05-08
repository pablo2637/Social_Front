import { ProfileElement } from "./";


export const PrivateProfile = ({ privateProfile, _id = Date.now(), name, privateDateMod }) => {

    return (
        <section className="secProfile" key={'sec' + _id}>

            {(name) &&
                <div className="divName">
                    <h3>{name} (Privado)</h3>
                    <p className="pDate">Ult. mod.: {privateDateMod}</p>
                </div>
            }

            <div className="divProfile">
                {
                    (privateProfile) &&
                        (privateProfile.length > 0) ?

                        privateProfile.map(el => (
                            <ProfileElement key={'a' + el.id} el={el} />
                        ))

                        :

                        (name) && <h3>Pendiente de crear perfil privado...</h3>
                }
            </div>

        </section>
    );
};
