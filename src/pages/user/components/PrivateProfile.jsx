import { NavLink } from "react-router-dom";
import { ProfileElement } from "./";


export const PrivateProfile = ({ privateProfile, _id = Date.now(), name, privateDateMod, image }) => {

    
    return (
        <section className="secPrivateProfile" key={'sec' + _id}>

            <header className="profHeader">

                <p className="pDate">Ult. mod.: {privateDateMod} hrs.</p>
                <h3>{name} <i className="fa-solid fa-mask"></i></h3>

                <div className="divUserImage">
                    <NavLink to={`/detail/${_id}`} >
                        <img src={image} alt={`Imagen de ${name}`} />
                    </NavLink>
                </div>

            </header>

            <main className="profMain">

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

            </main>

        </section>
    );
};
