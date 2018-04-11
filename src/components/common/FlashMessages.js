import React from 'react';
import Flash from '../../lib/Flash';

const FlashMessages = () => {
  // Flash.getMessages returns this._messages
  const messages = Flash.getMessage();
  Flash.clearMessage();
  return(
    <div className="container">
      {messages && Object.keys(messages).map((type, i) =>
        //messages[type] is the value of that key/type
        <div key={i} className={`notification is-${type}`}>{messages[type]}</div>
      )}
    </div>
  );
};

export default FlashMessages;
