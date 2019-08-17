import React from 'react';

const webworker = new Worker('worker.js');

function App() {
  function sendGrpcRequest() {
    webworker.postMessage({
      user: 'testing',
      event: 'hovering',
      timestamp: Date.now().toString(),
      url: window.location.href,
      stringArray: ['metadata', 'goes', 'here', 'in', 'this', 'array']
    });

    webworker.onmessage = e => {
      console.log('on main thread, response from web worker:', e.data);
    }
  }

  return (
    <div>
      App here!
      <br />
      <button onClick={sendGrpcRequest}>Send Grpc Request</button>
      <br />
      Open your console to see grpc response from server when you press the button
    </div>
  );
}

export default App;
