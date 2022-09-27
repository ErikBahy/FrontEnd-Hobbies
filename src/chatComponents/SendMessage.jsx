import React, { useState } from 'react';
import { db } from '../firebase'
import {addDoc, collection, serverTimestamp} from 'firebase/firestore'
import { useParams } from 'react-router-dom';

const style = {
  form: `h-14 w-full max-w-[100vW] flex text-xl absolute bottom-0`,
  input: `w-full text-xl p-3 bg-gray-900 text-white outline-none border-none`,
  button: `w-[20%] bg-green-500`,
};

const SendMessage = ({scroll , user }) => {
  const [input, setInput] = useState('');
  const {postId} = useParams();
  const sendMessage = async (e) => {
    e.preventDefault()
    if (input === '') {
        alert('Please enter a valid message')
        return
    }
    
    await addDoc(collection(db, 'messages'), {
        text: input,
        name: user.username,
        uid: user.userCognitoId,
        timestamp: serverTimestamp(),
        postId : postId

    })
    setInput('')
    scroll.current.scrollIntoView({behavior: 'smooth'})
  }

  return (
    <form onSubmit={sendMessage} className={style.form}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className={style.input}
        type='text'
        placeholder='Message'
      />
      <button className={style.button} type='submit'>
        Send
      </button>
    </form>
  );
};

export default SendMessage;
