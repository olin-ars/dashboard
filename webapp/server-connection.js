import SocketIOClient from 'socket.io-client';

export default class ServerConnection {

  constructor(serverUri) {
    this.serverUri = serverUri;
    this.io = null;
    this.messageHandlers = {};
  }

  connect() {
    // Open WebSocket connection to server
    this.io = SocketIOClient.connect(`${this.serverUri}/observing`);
  }

  emit(msgName, payload) {
    this.io.emit(msgName, payload);
  }

  /**
   * Attempts to register a message handler with socket.io. Must be called after connect().
   * @param {string} msgName - the name of the message to listen for
   * @param {function} callback - the function to call when the message is received
   * @return {boolean} whether or not the callback was registered successfully. If false,
   * it was likely due to connect() not having been called yet.
   */
  registerMessageHandler(msgName, callback) {
    // Register with socket.io if we're connected
    if (this.io) {
      this.io.on(msgName, callback);
      return true;
    }
    return false;
  }

}