# MongoDB
- MongoDB is a NoSQL database and it is a document database.
- It is a document oriented database program.
- It means the data is stored in the Collections in the form of Documents.
- Collections -> Documents -> Deals

## Installation
### 1. Self Managed
- Download the installer on the system using the file.
- Install it on the system.
- Use it like any other Database like the SQL and other databases.

### 2. Managed By MongoDB
- MongoDB takes the database, installs it on to the cloud server or to a platform.
- There are 2 types of version:
  - Community  - For small independent developers
  - Enterprize - For the companies.
- The Community and the Enterprize Edition both can be Self Managed or Manged by the MongoDB.

## What we will be using?
- We will be using the Cloud Version of the MongoDB.
- Community version of the Database.
- We can go from the local to the production very easily without much hassle.

- After registering on the platform of the MongoDB, there will be an option to register on the cluster.
- GO with the free plan M0.
- The free version can go to the production and the deployment.
- MongoDB gives the option to place the database on  AWS or Google Cloud or Azure then is gets the instance of the server i.e. getting a hosting service from AWS or Google Cloud or Azure.
- ![Cluster Creation](image/connect.png)

![Compass Selection](image/string.png)

- Copy the string from the MongoDB Dashboard to the database.js file

```js
const URL = "mongodb+srv://rohitramchandanistm1996:rWSm0uFArq3snQ9e@devtinder.5r7n2iz.mongodb.net/"
```

## MongoDB Compass 
- This is a GUI which helps the user to see the content of the database.
![alt text](image/createDB.png)

- Create a Database -> HelloWorld
- Create a Collection(Table) -> UserCollection in the database
- Now like we insert the values in our database we will insert the document in Collection.
- Documents are like a javascript object.
- ![alt text](image/createDOC.png)

## Connect the NodeJS Application to the Database:-
- The MongoDB package is required to connect the NodeJS code to the MongoDB.
- To connect the code to the file system the package is fs.
- The package to connect to mongodb is present in the npm, npm is a collection of a lot of packages.
- npm is the largest library management system available for JavaScript.
- All the JavaScript packages are available in npm.
- To encrypt password, send emails or do other things we have package in npm.
- File system package is available in the NodeJS inherently.


## Command to install MongoDB:-
- npm install mongodb
- This puts the code of the MongoDB in the node_modules.

## Include the mongodb package in our code:-
```js
require("mongodb");
```

## Documentation
- Refer the documentation of the library.
- https://mongodb.github.io/node-mongodb-native/6.18/
- Change the Database name and the Collection names etc.

## CRUD Operations
- Using the documentation of the mongo we can do the CRUD operations.
- Aggregate Functions can also be used.

### 1. Connecting to the Database :
```js
async function main() {

    /* Use connect method to connect to the server */
    await client.connect();
    console.log('Connected successfully to server');

    const db = client.db(dbName);
    const collection = db.collection('UserCollection');

    return 'Done.';
}
```

### 2. Insertion in the Database :
```js
async function main() {

    /* Use connect method to connect to the server */
    await client.connect();
    console.log('Connected successfully to server');

    const db = client.db(dbName);
    const collection = db.collection('UserCollection');

    /* 1. Insert the data in the Database */
    const data = {
        "firstname": "Pooja",
        "lastname": "Chandiramani",
        "city": "Mumbai",
        "phoneNumber": "+91-7820841799"
    }

    const insertResult = await collection.insertMany([data]);
    console.log('Inserted documents =>', insertResult);

    return 'Insertion Done.';
}
```

### 3. Fetch the Document from the Database :
```js
async function main() {

    /* Use connect method to connect to the server */
    await client.connect();
    console.log('Connected successfully to server');

    const db = client.db(dbName);
    const collection = db.collection('UserCollection');

    /* 2. Read the data from the Database */
    const findResult = await collection.find({}).toArray();
    console.log('Found documents =>', findResult);

    return 'Insertion Done.';
}
```

### 4. Using countDocument Function of the collection :
```js
async function main() {

    /* Use connect method to connect to the server */
    await client.connect();
    console.log('Connected successfully to server');

    const db = client.db(dbName);
    const collection = db.collection('UserCollection');

    /* 3. Counting the operations */
    const countResults = await collection.countDocuments({});
    console.log("Count of documents in the collection => ", countResults);

    return 'Insertion Done.';
}
```

### 5. Search in the Collection for a Document with a filter
```js
async function main() {

    /* Use connect method to connect to the server */
    await client.connect();
    console.log('Connected successfully to server');

    const db = client.db(dbName);
    const collection = db.collection('UserCollection');

    /* 4. Find all the documents with a filter of firstname : Pooja */
    const result = await collection.find({firstname:"Pooja"}).toArray();
    console.log("result => ", result);

    return 'Insertion Done.';
}
```

### NOTE:-
- find() of the collection always return a cursor, so always use the toArray() with it.
- It returns the cursor because we can do the chaining of the methods with the help of cursor like 
  - find([data]).toArray();
  - find([data]).countDocument();
  - find([data]).estimatedDocumentCount();

- In the production level code mongoose library is used.
- MongoDB Library is not used.

