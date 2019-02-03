const amqp = require('amqplib/callback_api');


//To connect the server
amqp.connect('amqp:localhost', function (err, conn) {});

//We then create a channel where the Api reside. 
amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {});
});

//We declare a queue to send message before being able to publlish
amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'hello';

    ch.assertQueue(q, {durable: false});
    // Note: on Node 6 Buffer.from(msg) should be used
    ch.sendToQueue(q, new Buffer('Hello World!'));
    console.log(" [x] Sent 'Hello World!'");
  });
    //lastly we close the connection and exit
    setTimeout(function() { conn.close(); process.exit(0) }, 500);
});
