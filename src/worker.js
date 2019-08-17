/* eslint-disable */
const { TrackingClient } =  require('./grpc_autogen_files/tracking_grpc_web_pb');
const { TrackingRequest } = require('./grpc_autogen_files/tracking_pb');

// here the url is of the envoy cluster!
const client = new TrackingClient('http://localhost:8080', null, null);

self.addEventListener('message', e => {
    const { user, event, timestamp, url, stringArray } = e.data;

    const trackingReq = new TrackingRequest();
    trackingReq.setUser(user);
    trackingReq.setEvent(event);
    trackingReq.setTimestamp(timestamp);
    trackingReq.setUrl(url);
    trackingReq.setStringarrayList(stringArray);

    client.track(trackingReq, {}, (err, response) => {
      console.log('in web worker, from grpc server we have', {err, response});
      self.postMessage('ok!');
    });
}, false);
