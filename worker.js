const { dequeueRequest } = require('./queue');

async function processRequest(clientId, requestData) {
    // Simulate processing by logging the request
    console.log(`Processing request from client ${clientId}:`, requestData);
}

async function startWorker(clientId) {
    while (true) {
        const request = await dequeueRequest(clientId);
        if (request) {
            await processRequest(clientId, request);
        }
    }
}

module.exports = { startWorker };
