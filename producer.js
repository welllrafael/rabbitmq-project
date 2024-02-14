const amqp = require('amqplib');

async function produce() {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
        const queue = 'hello';

        await channel.assertQueue(queue, { durable: false });
        const message = 'Hello, RabbitMQ! Here we go.';
        channel.sendToQueue(queue, Buffer.from(message));
        console.log(`Producer sent: ${message}`);

        setTimeout(() => {
            connection.close();
            process.exit(0);
        }, 500);
    } catch (error) {
        console.error(error);
    }
}

produce();