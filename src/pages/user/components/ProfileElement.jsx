import { useSelector } from "react-redux";


export const ProfileElement = ({ el }) => {

    const { isLoading } = useSelector((state) => state.users);

    return (
        <article key={'aa' + el.id}>

            {(el.typeInput == 'text') &&
                <p
                    className="pText"
                    name={'p' + el.name}
                    id={'p' + el.id}
                >{el.content}
                </p>}


            {
                (el.typeInput == 'title') &&
                <p
                    className="pTitle"
                    name={'t' + el.name}
                    id={'t' + el.id}
                >{el.content}
                </p>
            }

            {
                (el.typeInput == 'paragraph') &&
                <p
                    className="pParagraph"
                    name={'g' + el.name}
                    id={'g' + el.id}
                >{`"${el.content}"`}
                </p>
            }


            {
                (el.typeInput == 'image') &&
                <div key={'d' + el.id} className="divImageContainer">             
                    <img
                        name={'i' + el.name}
                        id={'i' + el.id}
                        src={(isLoading) ? '../../../assets/no-pic.png' : el.content}
                    />

                </div>
            }
        </article>
    )
}
