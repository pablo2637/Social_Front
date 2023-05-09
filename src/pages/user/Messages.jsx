import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { LittlePeople, Msgs } from "./components";
import { getUserData } from '../user/helpers/getUserData'


export const Messages = () => {


  const [myUsers, setMyUsers] = useState([]);
  const { profiles, invites } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state.auth);
  const [show, setShow] = useState({});


  const filterProfiles = () => {

    let newUsers = [];
    user.msgs.forEach(msg => {

      const _id = msg.to || msg.from;
      const exists = newUsers.find(user => user.to == _id || user.from == _id)

      if (!exists) {
        const { name, image } = getUserData(_id, profiles);
        newUsers.push({ ...msg, name, image });

      }

    });

    setMyUsers(newUsers);
  };


  const handleOnClick = (usr) => {

    const _id = usr.to || usr.from;
    const newUsr = myUsers.find(u => u.to == _id || u.from == _id);
    console.log('_id',_id)
    // const newUsr = {
    //   show: true,
    //   _id
    // }
    newUsr.show = true;
    newUsr._id = _id;
    setShow(newUsr);

  }




  useEffect(() => {
    filterProfiles();

  }, [profiles]);


  return (
    <section className="secMessages">

      <div className='divRoot'>
        <NavLink to='/'>&gt; Tu cuenta</NavLink><span> &gt; Mis mensajes:</span>
      </div>


      <h2>Mis Mensajes:</h2>

      <div>
        <img src="../../assets/msg.png" alt="Imagen de portada de perfiles" />
      </div>


      <h3>Aquí los tienes:</h3>

      <div className="divCont">
        {
          myUsers.map(usr => (
            <div className="divChild1">
              < LittlePeople key={usr.date} {...usr} />
              <button onClick={() => handleOnClick(usr)}>ver</button>

            </div>
          ))
        }
        {/* <div className="divChild2"> */}
          {
            (show.show) &&
            <Msgs _id={show._id} msgs={user.msgs} name={show.name} />
          }
        {/* </div> */}
      </div>

    </section>
  )

}
