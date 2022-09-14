const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://kvnann:5359@todos.x7ihl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const dbName = 'todos';

const client = new MongoClient(url);


async function main() {
    // Use connect method to connect to the server
    client.connect(async function(err){
        if(err){
            console.log("ERROR")
        }else{
            console.log('Connected successfully to server');
            const db = client.db(dbName);
            const collection = db.collection('users');
            const insertResult = await collection.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }]);
            console.log('Inserted documents =>', insertResult);
        }
    });
  
  }
  
  main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());