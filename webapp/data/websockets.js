// This file helps integrate the WebSockets connection to the server with the Redux data store.
// It is based off https://medium.com/@ianovenden/redux-websocket-integration-c1a0d22d3189

import io from 'socket.io-client';

const socket = io.connect(window.SERVER_URI);

export const MESSAGE_TYPES = {
  HEADING: 'heading',
  POSITION: 'position',
  HEADING_CONTROL_KI: 'control/heading/ki',
  HEADING_CONTROL_KP: 'control/heading/kp',
  HEADING_CONTROL_ERROR_DESIRED_RUDDER_POS: 'control/heading/error_desired_rudder_pos',
  SET_HEADING_CONTROL_KP: 'set:control/heading/kp',
  SET_HEADING_CONTROL_KI: 'set:control/heading/ki',
  SET_TARGET_HEADING: 'set:control/target_heading'
};

export const init = ( store ) => {

  Object.keys(MESSAGE_TYPES).forEach(msgType => socket.on(MESSAGE_TYPES[msgType], (payload) =>
        store.dispatch({ type: MESSAGE_TYPES[msgType], data: payload.data })
      )
    );
};

export const emit = ( type, payload ) => socket.emit( type, payload );