import React, { useState } from 'react';

const webworker = new Worker('worker.js');

function App() {
  function sendGrpcRequest() {
    webworker.postMessage({
      user: 'testing',
      event: 'clicked',
      timestamp: Date.now().toString(),
      url: window.location.href,
      stringArray: ['metadata', 'goes', 'here', 'in', 'this', 'array']
    });

    webworker.onmessage = e => {
      console.log('on main thread, response from web worker:', e.data);
    }
  }

  function handleSendText() {
    if (text.trim().length === 0) {
      console.log('Enter some text');
    } else {
      webworker.postMessage({
        user: 'testing',
        event: 'text',
        timestamp: Date.now().toString(),
        url: window.location.href,
        stringArray: ['metadata', 'goes', 'here', 'in', 'this', 'array'],
        data: text
      });
    }
  }

  let [text, setText] = useState('');

  return (
    <div>
      App here!
      <br />
      <button onClick={sendGrpcRequest}>Send Grpc Request</button>
      <br />
      <br />
      Open your console to see grpc response from server when you press the button
      <br />
      <br />

      <label>Send this text over to the server!</label>
      <br />
      <input type='text' onChange={e => setText(e.target.value)} value={text} />
      <br />
      <br />
      <button onClick={handleSendText}>Click to send it to the server. Open console</button>
    </div>
  );
}

export default App;
