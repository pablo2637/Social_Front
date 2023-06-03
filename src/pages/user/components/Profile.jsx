import { ProfileElement } from "./";
import { NavLink } from "react-router-dom";


export const Profile = ({ profile, _id = Date.now(), name, dateMod, image }) => {


    return (
        <section className="secProfile" key={'sec' + _id}>

            <header className="profHeader">

                <p className="pDate">Ult. mod.: {dateMod} hrs.</p>
                <h3>{name}</h3>

                <div className="divUserImage">
                    <NavLink to={`/detail/${_id}`} >
                        <img src={image} alt={`Imagen de ${name}`} />
                    </NavLink>
                </div>

            </header>

            <main className="profMain">

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

            </main>

        </section>
    );
};
