var mongodb = require("mongodb");
var mongoClient = mongodb.MongoClient;
let connection;
let db;
async function connectDb() {
connection = await mongoClient.connect("mongodb://localhost:27017");
 db = connection.db("bookmyshowclone");
 return db
}

async function closeConnection(){
    if (connection ) {
        await connection.close()
        
    }else{
        console.log("No Connection");
    }
}
module.exports = { connectDb ,db,connection,closeConnection } ;
