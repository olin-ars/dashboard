// This file helps integrate the WebSockets connection to the server with the Redux data store.
// It is based off: https://medium.com/@ianovenden/redux-websocket-integration-c1a0d22d3189

import io from 'socket.io-client';

const socket = io(window.SERVER_URI);

export const MESSAGE_TYPES = {
  HEADING: 'heading',
  POSITION: 'position',
  HEADING_CONTROL_KI: 'control/heading/ki',
  HEADING_CONTROL_KP: 'control/heading/kp',
  SET_HEADING_CONTROL_KP: 'set:control/heading/kp',
  SET_HEADING_CONTROL_KI: 'set:control/heading/ki',
};

export const init = ( store ) => {

  Object.keys(MESSAGE_TYPES).forEach(msgType => socket.on( msgType, (payload ) =>
        store.dispatch({ type: msgType, payload })
      )
    );
};

export const emit = ( type, payload ) => socket.emit( type, payload );