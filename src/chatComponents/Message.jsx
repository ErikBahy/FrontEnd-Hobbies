import React from 'react';

const style = {
  message: `flex break-all items-center m-4 py-2 px-3 `,
  name: `relative mt-[-4rem] text-gray-600 text-xs overflow-auto mb-[5px] mr-[10px]`,
  sent: `bg-[#395dff] text-white flex-row-reverse text-end float-right`,
  received: `bg-[#e5e5ea] text-black float-left`,
};

//rounded-tl-full rounded-tr-full    rounded-bl-full   

const Message = ({ message,user }) => {
  const messageClass = 
  message.uid === user.userCognitoId
  ? `${style.sent}`
  : `${style.received}`

  return (
    <div>
      <div className={`${style.message} ${messageClass}`}>
        <p className={style.name}>{message.name}</p>
        <p>{message.text}</p>
      </div>
    </div>
  );
};

export default Message;
