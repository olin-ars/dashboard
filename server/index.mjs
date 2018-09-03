import dotenv from 'dotenv';
import fs from 'fs';
import DatabaseConnection from './database.mjs';
import HttpServer from './http-server.mjs';
import TelemetryDataStore from './telemetry-data-store.mjs';
import WebSocketServer from './websocket-server.mjs';

// Try loading environment variables from a .env file
if (fs.existsSync('./.env')) {
  dotenv.config();
}

// Figure out which port we're going to be listening for connections on
const port = process.env.PORT || 1234;

// Connect to MongoDB
const dbConn = new DatabaseConnection();
dbConn.connect();

// Start the HTTP server
const httpServer = new HttpServer(port);

// Initialize a telemetry data store and start the WebSockets server
const telemetryDataStore = new TelemetryDataStore(30);
const wsServer = new WebSocketServer(telemetryDataStore.processReceivedData);
wsServer.start(httpServer.getHTTPServer());
