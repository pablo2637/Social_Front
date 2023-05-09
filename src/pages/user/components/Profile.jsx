import { useSelector } from "react-redux";
import { ProfileElement } from "./";

export const Profile = ({ profile, _id = Date.now(), name, dateMod }) => {

    const { profiles, isLoading, userStatus } = useSelector((state) => state.users);


    return (
        <section data-aos="fade-in" className="secProfile" key={'sec' + _id}>

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
                            <ProfileElement key={'a' + el.id} el={el} />
                        ))

                        :

                        (name) && <h3>Pendiente de crear perfil público...</h3>
                }
            </div>

        </section>
    );
};
