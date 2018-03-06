import SocketIO from 'socket.io';

export default class WebSocketServer {

    constructor(telemetryDataHandler) {
        this.io = null;
        this.observingNs = null;
        this.telemetryDataHandler = telemetryDataHandler;
        this.onObserverConnection = this.onObserverConnection.bind(this);
        this.onReporterConnection = this.onReporterConnection.bind(this);
        this.onSetHeadingControlConstant = this.onSetHeadingControlConstant.bind(this);
        let heading = 20;
    }

    start(httpServer) {
        this.io = new SocketIO(httpServer);
        this.reportingNs = this.io.of('/reporting');
        this.reportingNs.on('connection', this.onReporterConnection);
        this.observingNs = this.io.of('/observing');
        this.observingNs.on('connection', this.onObserverConnection);

        console.log(`WebSocket server started successfully.`)
    }

    onReporterConnection(socket) {
        console.log('Reporter connected');
        socket.on('report', (data) => this.onReportMsgReceive(socket, data));
        socket.on('disconnect', () => this.onDisconnect(socket));
    }

    onObserverConnection(socket) {
        console.log('Observer connected');
        socket.on('set:control/heading/kp', (data) => this.onSetHeadingControlConstant('set:control/heading/kp', data));
        socket.on('set:control/heading/ki', (data) => this.onSetHeadingControlConstant('set:control/heading/ki', data));
        socket.on('disconnect', () => this.onDisconnect(socket));

    }

    onDisconnect(socket) {
        console.log('Client disconnected');
    }

    onReportMsgReceive(socket, msg) {
        if (this.telemetryDataHandler) {
            this.telemetryDataHandler(msg);
        }
        // Push the msg to any observers
        if (this.observingNs) {
            const type = msg.type;
            delete msg.type;
            if (process.env.VERBOSE) {
              console.log(`Reporting to ${type}:`);
              console.log(msg);
            }
            this.observingNs.emit(type, msg);
        }
    }

    onSetHeadingControlConstant(kpOrKi, value) {
      console.log(value);
      this.reportingNs.emit(kpOrKi, value);
    }

}