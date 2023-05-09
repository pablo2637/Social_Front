
export const LittlePeople = ({ date, name, image, sender, receiver }) => {


    return (

        <div className="divLittlePeople">
            {/* {(date) && <p className="pLPDate">Fecha: {new Date(date).toLocaleString()}</p>} */}
            {(name) && <p className="pLPName">{name}</p>}
            {(sender) && <p className="pLPSender">De: {sender}</p>}
            {(receiver) && <p className="pLPReceiver">Para: {receiver}</p>}
            {(image &&
                <div>
                    <img src={image} alt={`Foto de ${name}`} />
                </div>
            )}
        </div>

    );
};
