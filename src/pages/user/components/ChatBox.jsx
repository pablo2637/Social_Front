import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { useSocketStore } from "../../../hooks/useSocketStore";


export const ChatBox = ({ _id, name }) => {

  const { chats } = useSelector((state) => state.socket);
  const { user } = useSelector((state) => state.auth);
  const { profiles } = useSelector((state) => state.users);

  const [chatIndex, setChatIndex] = useState(0);
  const [chat, setChat] = useState([]);
  const [lastLine, setLastLine] = useState(0)

  const { openChat, sendMsg } = useSocketStore();



  const prepChat = (data) => {

    const newChat = [];
    let lastSender;

    const firstName = name.split(' ')[0];
    console.log('data chat', data)
    if (!data) return
    //   setChat(data);
    //   console.log('aqui');
    //   return
    // }
    console.log('aca');

    data.chat.forEach(ch => {

      if (ch.msgSender == lastSender) {

        newChat.push({
          type: 'msg',
          content: ch.msg
        });

        newChat.push({
          type: 'date',
          content: ch.date
        });

        lastSender = ch.msgSender;

      } else {

        newChat.push({
          type: 'spc',
          content: ' '
        });

        newChat.push({
          type: 'name',
          content: ch.msgSender == _id ? `${firstName}:` : 'Tú:'
        });

        newChat.push({
          type: 'msg',
          content: ch.msg
        });

        newChat.push({
          type: 'date',
          content: ch.date
        });

        lastSender = ch.msgSender;

      }

    });


    setChat({
      ...data,
      chat: newChat
    });

  };



  const handleOnSubmit = (ev) => {
    ev.preventDefault();

    if (ev.target.text.value == '') return

    sendMsg(ev.target.text.value, chatIndex, _id);
    ev.target.reset();

    // prepChat(chats[chatIndex]);

  };



  const getIndex = async () => {

    const ind = await openChat(user._id, _id);
    console.log('ind', ind)
    setChatIndex(ind);
    prepChat(chats[ind]);

  };



  useEffect(() => {

    prepChat(chats[chatIndex]);

  }, [chats[chatIndex]?.chat]);




  useEffect(() => {
    getIndex();

  }, []);


  return (

    <div>

      <table>
        <thead>
          <tr>
            <th>{name}</th>
            {/* <th>{JSON.stringify(chat)}</th> */}
          </tr>

        </thead>

        <tbody>


          {(chat) ?

            (chat.chat) &&

            chat.chat.map((ch, ind) =>

              <tr key={ind + Date.now()}>
                <td>
                  {
                    ch.content
                  }
                </td>
              </tr>

            )

            :

            <h2>NO hay chats</h2>

          }

        </tbody>

        <tfoot>
          <tr>
            <td>
              <form onSubmit={handleOnSubmit}>
                <input type="text" name="text" placeholder="Escribe algo..." />
                <input type="submit" value="Enviar" />
              </form>
            </td>
          </tr>
        </tfoot>

      </table>


    </div>

  );

};

/*
<div className="App">
 {!showChat ? (
   <div className="joinChatContainer">
     <h3>Join A Chat</h3>
     <input
       type="text"
       placeholder="John..."
       onChange={(event) => {
         setUsername(event.target.value);
       }}
     />
     <button onClick={joinRoom}>Join A Room</button>
   </div>
 ) : (
   <Chat socket={socket} username={username} room={room} />
 )}
</div> */

  // const [username, setUsername] = useState("");
  // const [room] = useState("1");
  // const [showChat, setShowChat] = useState(false);

  // const joinRoom = () => {
  //   if (username !== "") {
  //     socket.emit("join_room", room);
  //     setShowChat(true);
  //   }
  // };