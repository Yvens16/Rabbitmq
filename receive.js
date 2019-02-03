var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'hello';

    ch.assertQueue(q, {durable: false});
    //We tell the server to deliver us the message from the queue
    //We provide a callback taht will be executed when RabbitMQ pushes messages to our consummer since it wiil do it asynchronously
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    ch.consume(q, function(msg) {
      console.log(' [x] Received %s', msg.content.toString());
    }, {noAck: true});
  });
});

