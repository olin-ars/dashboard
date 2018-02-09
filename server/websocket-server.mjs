import SocketIO from 'socket.io';

export default class WebSocketServer {

    constructor(telemetryDataHandler) {
        this.io = null;
        this.observingNs = null;
        this.telemetryDataHandler = telemetryDataHandler;
        this.onObserverConnection = this.onObserverConnection.bind(this);
        this.onReporterConnection = this.onReporterConnection.bind(this);
        let heading = 20;
        setInterval(() => {
            if (this.io) {
                console.log('Emitting update...');
                this.io.emit('update', {heading: heading});
                if (++heading > 360) {
                    heading = 1;
                }
            }
        }, 250);
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
        socket.on('report', (data) => this.onTelemetryPush(socket, data));
        socket.on('disconnect', () => this.onDisconnect(socket));

    }

    onObserverConnection(socket) {
        console.log('Observer connected');
        socket.on('Hello', (data) => console.log(data));
        socket.on('registerListener', (data) => this.onRegisterListenerRequest(socket, data));
        socket.on('disconnect', () => this.onDisconnect(socket));

    }

    onDisconnect(socket) {
        console.log('Client disconnected');
    }

    onRegisterListenerRequest(socket, data) {
        this.connectedListeners.indexOf()
    }

    onTelemetryPush(socket, data) {
        if (this.telemetryDataHandler) {
            this.telemetryDataHandler(data);
        }
    }

    broadcastDevices(msg) {
        const connectedDevices = Object.values(io.sockets.connected);
        if (connectedDevices.length > 0) {
            connectedDevices.forEach((ws) => {
                ws.emit('devices', msg);
            });
        }
    };
}