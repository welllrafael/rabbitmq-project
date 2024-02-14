const amqp = require('amqplib');

async function consume() {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
        const queue = 'hello';

        await channel.assertQueue(queue, { durable: false });
        console.log('Consumer waiting for messages...');

        channel.consume(queue, (message) => {
            console.log(`Consumer received: ${message.content.toString()}`);
        }, { noAck: true });
    } catch (error) {
        console.error(error);
    }
}

consume();