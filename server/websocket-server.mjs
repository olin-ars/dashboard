import SocketIO from 'socket.io';

export default class WebSocketServer {
  constructor(telemetryDataHandler) {
    this.io = null;
    this.observingNs = null;
    this.telemetryDataHandler = telemetryDataHandler;
    this.onObserverConnection = this.onObserverConnection.bind(this);
    this.onReporterConnection = this.onReporterConnection.bind(this);
    this.onPublishROSMessageMessage = this.onPublishROSMessageMessage.bind(this);
    this.onStartStopRosbag = this.onStartStopRosbag.bind(this);
  }

  start(httpServer) {
    this.io = new SocketIO(httpServer);
    this.reportingNs = this.io.of('/reporting');
    this.reportingNs.on('connection', this.onReporterConnection);
    this.observingNs = this.io.of('/observing');
    this.observingNs.on('connection', this.onObserverConnection);

    console.log('WebSocket server started successfully.');
  }

  onReporterConnection(socket) {
    console.log('Reporter connected');
    socket.on('message', data => this.onReporterMsgReceive(socket, data));
    // socket.on('disconnect', () => this.onDisconnect(socket));
  }

  onObserverConnection(socket) {
    console.log('Observer connected');
    socket.on('publishROSMessage', data => this.onPublishROSMessageMessage(data));
    socket.on('startStopRosbag', command => this.onStartStopRosbag(command));
    socket.on('disconnect', () => this.onDisconnect(socket));
  }

  // eslint-disable-next-line no-unused-vars
  static onDisconnect(socket) {
    console.log('Client disconnected');
  }

  onReporterMsgReceive(socket, msg) {
    if (this.telemetryDataHandler) {
      this.telemetryDataHandler(msg);
    }
    // Push the msg to any observers
    if (this.observingNs) {
      const topic = msg.topicName;
      // eslint-disable-next-line no-param-reassign
      delete msg.topicName;
      if (process.env.VERBOSE) {
        console.log(`Reporting to ${topic}:`);
        console.log(msg);
      }
      this.observingNs.emit(topic, msg);
    }
  }

  onPublishROSMessageMessage(data) {
    if (this.reportingNs) {
      this.reportingNs.emit('publishROSMessage', data);
    }
  }

  onStartStopRosbag(command) {
    console.log('Received command:');
    console.log(command);
    if (this.reportingNs) {
      this.reportingNs.emit('startStopRosbag', command);
    }
  }
}
