const sse = new EventSource("http://localhost:8080/stream");

// can assign any function
sse.onmessage = console.log

