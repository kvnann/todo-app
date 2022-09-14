var helpers = require("./helpers")
const { MongoClient } = require('mongodb');
const config = require("./config")

const url = config.dbUrl
const dbName = config.dbName

const client = new MongoClient(url);


var lib = {}






lib.create = function(dir,data,callback){
    async function main() {
        const client = new MongoClient(url);
        client.connect(async function(err){
            if(err){
                callback({"Error":err})
            }else{
                const db = client.db(dbName);
                const collection = db.collection(dir);
                var insertResult = false;
                insertResult = await collection.insertOne(data);
                if(insertResult){
                    callback(false)
                }
                else{
                    callback({"Error" : "Couldn't create data"})
                }
            }
        });
      }
      
      main()
        .catch((err)=>{
            callback({"Error":err});
        })
        .finally(() => client.close());
};

lib.read = function(dir,fileName,callback){
    async function main() {
        const client = new MongoClient(url);
        client.connect(async function(err){
            if(err){
                callback({"Error":err})
            }else{
                const db = client.db(dbName);
                const collection = db.collection(dir);
                var findResult = false;
                findResult = await collection.find({fileName:fileName}).toArray();
                if(findResult && findResult.length > 0){
                    callback(false,findResult[0])
                }
                else{
                    callback({"Error" : "Couldn't read data, it may not exist"})
                }
            }
        });
      }
      
      main()
        .catch((err)=>{
            callback({"Error":err});
        })
        .finally(() => client.close());

}


lib.update = (dir,fileName,data,callback)=>{
    async function main() {
        const client = new MongoClient(url);
        client.connect(async function(err){
            if(err){
                callback({"Error":err})
            }else{
                const db = client.db(dbName);
                const collection = db.collection(dir);
                var findResult = false;
                findResult = await collection.find({fileName:fileName}).toArray();
                if(findResult && findResult.length > 0){
                    const deleteResult = await collection.deleteMany({ fileName: fileName });
                    if(deleteResult){
                        var insertResult = false;
                        insertResult = await collection.insertOne(data);
                        if(insertResult){
                            callback(false)
                        }
                        else{
                            callback({"Error" : "Couldn't create data"})
                        }
                    }
                    else{
                        callback({"Error":"Couldn't delete old item"})
                    }
                }
                else{
                    callback({"Error" : "Couldn't find data, it may not exist"})
                }
            }
        });
      }
      
      main()
        .catch((err)=>{
            callback({"Error":err});
        })
        .finally(() => client.close());
}


lib.delete = (dir,fileName,callback)=>{
    async function main() {
        const client = new MongoClient(url);
        client.connect(async function(err){
            if(err){
                callback({"Error":err})
            }else{
                const db = client.db(dbName);
                const collection = db.collection(dir);
                var deleteResult = false;
                deleteResult = await collection.deleteMany({ fileName: fileName });
                if(deleteResult){
                    callback(false)
                }
                else{
                    callback({"Error" : "Couldn't delete data"})
                }
            }
        });
      }
      
      main()
      .catch((err)=>{
        callback({"Error":err});
      })
      .finally(() => client.close());
}


lib.list = (dir,callback)=>{
    async function main() {
        const client = new MongoClient(url);
        client.connect(async function(err){
            if(err){
                callback({"Error":err})
            }else{
                const db = client.db(dbName);
                const collection = db.collection(dir);
                var result = await collection.find({}).toArray();
                callback(false,result)
            }
        });
      }
      
      main()
      .catch((err)=>{
        callback({"Error":err});
      })
      .finally(() => client.close());
}
module.exports = lib