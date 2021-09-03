const amqp = require('amqplib');
require('dotenv').config()

const msg = {number: 67};

async function connect(){
    
    try{
        const connection = await amqp.connect(process.env.RABBIT_CLUSTER);
        const channel = await connection.createChannel();
        const result = await channel.assertQueue("submissions");

        channel.sendToQueue("submissions", Buffer.from(JSON.stringify(msg)));

        console.log(`Submission Successful!`);



    }catch(err){
        console.log(err);
    }
}

connect();