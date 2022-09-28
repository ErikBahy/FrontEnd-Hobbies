import React, { useEffect , useRef, useState} from 'react';
import Message from './Message';
import SendMessage from './SendMessage';
import { db, } from '../firebase';
import { query, collection, orderBy, onSnapshot,where } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
//import { firebaseRef } from "../config";

const style = {
  main: `flex flex-col p-[10px] overflow-auto mb-[40px]`,
};

const Chat = ({user }) => {
  const [messages, setMessages] = useState([]);
  const scroll = useRef();
  const {postId} = useParams();
  useEffect(() => {
    const q = query(collection(db, "messages"), where("postId", "==", postId), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsubscribe();
  }, []);
  return (
    <>
        <main className={style.main}>
          {messages &&
            messages.map((message) => (
              <Message key={message.id} message={message} user={user}/>
            ))}
        </main>
        {/* Send Message Compoenent */}
              
        <SendMessage user={user} scroll={scroll} />
        <span ref={scroll}></span>
      </>
  );
};

export default Chat;
