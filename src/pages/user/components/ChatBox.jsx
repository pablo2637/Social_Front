import React from 'react'

export const ChatBox = () => {
  return (
    <div>ChatBox</div>
  )
}

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