import React from 'react';

const { TrackingClient } = require('./grpc_autogen_files/tracking_grpc_web_pb');
const { TrackingRequest } = require('./grpc_autogen_files/tracking_pb');

const client = new TrackingClient('http://localhost:8080', null, null);

function App() {
  function sendGrpcRequest() {
    const trackingReq = new TrackingRequest();
    trackingReq.setUser('testing');
    trackingReq.setEvent('click');
    trackingReq.setTimestamp(Date.now().toString());
    trackingReq.setUrl(window.location.href);
    trackingReq.setStringarrayList(['some', 'metadata', 'goes', 'here', 'in', 'this', 'array']);

    client.track(trackingReq, {}, (err, response) => {
      console.log('from grpc server we have', { err, response });
      // response is a type of TrackingResponse
      console.log('ack:', response.getAcknowleged());
    });
  }

  return (
    <div>
      App here!
      <button onClick={sendGrpcRequest}>Send Grpc Request</button>
    </div>
  );
}

export default App;
