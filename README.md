# Client Server Communication Protocols

## WebSockets (WS)

Bidirectional full duplex(no polling) protocol for communication between client and server.  
Open Persisted HTTP 1.1/2.0 (TCP) connection.  
Stateful, difficult to horizontally scale.  

### WS Handshake

Open the HTTP 1.1/2.0 connection with Upgrade header.  

## Server Sent Events (SSE)

Unidirection server sent event channel.  
Open Persisted HTTP 2.0 (TCP) connection.  
Stateful, difficult to horizontally scale.  

### SSE Handshake

Open HTTP connection with 'text/event-stream' header.  
Content-type: 'text/event-stream'  
Transfer-Encoding: 'chunked'  

Server keeps sending more stuff

## Polling

We ask the backend if it can the provide the service we need. Then the backend sends a response . This process is repeated regularly. Stateless.

## Pushing

The backend pushes a response to the client when it wants to. Statefull.

## Long Polling

We ask the backend if it can the provide the service we need. Then the backend sends a response if it can provide the service else it will wait until the service is ready. This process is repeated regularly. Stateless.
