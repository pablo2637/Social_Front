
export const LittlePeople = ({ date, name, image, sender, receiver }) => {

    return (

        <div>
            {(date) && <p>Fecha: {new Date(date).toLocaleString()}</p>}
            {(name) && <p>{name}</p>}
            {(sender) && <p>De: {sender}</p>}
            {(receiver) && <p>Para: {receiver}</p>}
            {(image &&
                <div>
                    <img src={image} alt={`Foto de ${name}`} />
                </div>
            )}
        </div>

    );
};
