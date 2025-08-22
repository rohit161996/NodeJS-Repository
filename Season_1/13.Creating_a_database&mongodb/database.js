/* 
 * Go to the mongodb 
 * Create a free M0 cluster
 * Get the connection string
 */

const { MongoClient } = require('mongodb');

const url = "mongodb+srv://rohitramchandanistm1996:0PjcLOLxxCQgJcFC@devtinder.5r7n2iz.mongodb.net/";

/* Create a new MongoDB Object and passing a new client over there */
const client = new MongoClient(url,
  {
    serverSelectionTimeoutMS: 10000,
    // TEMPORARY DIAGNOSTIC ONLY — remove after you fix local TLS inspection/AV
    // tlsAllowInvalidCertificates: true
  });

/* Database Name */
const dbName = 'HelloWorld';

async function main() {

    /* Use connect method to connect to the server */
    await client.connect();
    console.log('Connected successfully to server');

    const db = client.db(dbName);
    const collection = db.collection('UserCollection');

    // /* 1. Insert the data in the Database */
    // const data = {
    //     "firstname": "Pooja",
    //     "lastname": "Chandiramani",
    //     "city": "Mumbai",
    //     "phoneNumber": "+91-7820841799"
    // }

    // const insertResult = await collection.insertMany([data]);
    // console.log('Inserted documents =>', insertResult);


    // /* 2. Read the data from the Database */
    // const findResult = await collection.find({}).toArray();
    // console.log('Found documents =>', findResult);


    // /* 3. Counting the operations */
    // const countResults = await collection.countDocuments({});
    // console.log("Count of documents in the collection => ", countResults);


    /* 4. Find all the documents with a filter of firstname : Pooja */
    const result = await collection.find({firstname:"Pooja"}).toArray();
    console.log("result => ", result);

    return 'Done.';
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(async () => await client.close());

