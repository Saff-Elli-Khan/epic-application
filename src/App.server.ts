import HTTP from "http";
import HTTPS from "https";
import express from "express";
import Debug from "debug";

export const Server = new (class {
  constructor(
    public App = express(),
    public ServerDebug = Debug("Epic:Server")
  ) {}

  public normalizePort = (PORT: number | string) => {
    // Resolve Port
    if (typeof PORT == "string") PORT = parseInt(PORT, 10);

    // Validate Port
    if (isNaN(PORT)) return PORT;
    else if (PORT >= 0) return PORT;
    else throw new Error(`Invalid Port '${PORT}' has been provided!`);
  };

  // Listen to a particular server
  public listen = (
    SERVER: HTTP.Server | HTTPS.Server,
    PORT: string | number
  ) => {
    // Normalize Port
    PORT = this.normalizePort(PORT);

    // Listen on provided port, on all network interfaces.
    SERVER.listen(PORT);

    // Event listener for HTTP/HTTPS Server.
    SERVER.on("listening", () => {
      const Address = SERVER.address();
      const Bind =
        typeof Address === "string"
          ? "Pipe " + Address
          : "Port " + Address?.port;

      this.ServerDebug("Listening on " + Bind);

      // Application listening
      console.log("Application Listening At Port: " + PORT);
    });

    // Event listener for HTTP server "error" event.
    SERVER.on("error", (error: any) => {
      if (error.syscall !== "listen") throw error;

      // Get Port Binding
      const Bind = typeof PORT === "string" ? "Pipe " + PORT : "Port " + PORT;

      // Handle specific listen errors with friendly messages
      switch (error.code) {
        case "EACCES":
          console.error(Bind + " requires elevated privileges!");
          break;
        case "EADDRINUSE":
          console.error(Bind + " is already in use!");
          break;
        default:
          throw error;
      }

      // Exit Application
      process.exit(1);
    });

    return this;
  };
})();
