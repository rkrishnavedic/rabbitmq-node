const amqp = require('amqplib');
require('dotenv').config()

async function connect(){
    
    try{
        const connection = await amqp.connect(process.env.RABBIT_CLUSTER);
        const channel = await connection.createChannel();
        const result = await channel.assertQueue("submissions");

        console.log("Waiting for messages!");

        channel.consume("submissions", message=>{
            console.log(message.content.toString());
        });

    }catch(err){
        console.log(err);
    }
}

connect();