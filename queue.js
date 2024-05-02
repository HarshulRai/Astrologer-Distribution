const Redis = require('ioredis');
const redis = new Redis();

async function enqueueRequest(clientId, requestData) {
    await redis.rpush(`queue:${clientId}`, JSON.stringify(requestData));
}

async function dequeueRequest(clientId) {
    const requestData = await redis.lpop(`queue:${clientId}`);
    return JSON.parse(requestData);
}

module.exports = { enqueueRequest, dequeueRequest };
