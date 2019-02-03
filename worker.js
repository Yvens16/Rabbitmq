var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'task_queue';

    ch.assertQueue(q, {durable: true});
    //We tell the server to deliver us the message from the queue
    //We provide a callback taht will be executed when RabbitMQ pushes messages to our consummer since it wiil do it asynchronously
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    ch.consume(q, function(msg) {
    var secs = msg.content.toString().split('.').length - 1;

      console.log(' [x] Received %s', msg.content.toString());
      setTimeout(function() {
        console.log(" [x] Done");
      }, secs * 1000);
    }, {noAck: true});
  });
});

