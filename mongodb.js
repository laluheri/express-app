const MongoClient = require("mongodb").MongoClient

const connectionString = "mongodb://user_latihan:123456@localhost:27017?authSource=admin"

    // MongoClient.connect(connectionString, {useUnifiedTopology: true}, (error, client) => {
    //     if(error) return console.error(error)
    //     console.log("Server databse connect!");
    // })

    // ---metode promise---
    // MongoClient.connect(connectionString, { useUnifiedTopology: true })
    //     .then(client => {
    //         console.log("Server database connec!")
    //     })
    //     .catch(error => console.error(error))

    // --Async / Await
    const con = (async () => {
        try {
            const client = await MongoClient.connect(connectionString, {
                useUnifiedTopology: true
            })
            const db = client.db('latihan')
            console.log("Database connected!");
            const quote = await db.collection('quotes').find().toArray()
            console.log(quote);
        } catch (error) {
            console.error(error);
        }
    })();
