const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const url = "mongodb://localhost:27017/";
const dbname = "conFusion";
const dboper = require("./operations");

MongoClient.connect(url).then((client) => 
{
	//assert.equal(err, null);

	console.log("Connected correctly to the server");

	const db = client.db(dbname);

	dboper.insertDocument(db, { name: "Vadonut", description: "Test"}, "dishes") 
	.then((result) => {
            console.log("Insert Document:\n", result.ops);

            return dboper.findDocuments(db, "dishes")
    }) 
    .then((docs) => {
            console.log("Found Documents:\n", docs);

            return dboper.updateDocument(db, { name: "Vadonut" }, { description: "Updated Test" }, "dishes"); 
    })
    .then((result) => {
            console.log("Updated Document:\n", result.result);

            return dboper.findDocuments(db, "dishes");
    }) 
    .then((docs) => {
            console.log("Found Updated Documents:\n", docs);
                            
            return db.dropCollection("dishes");
    }) 
    .then((result) => {
            console.log("Dropped Collection: ", result);

            return client.close();
    })
    .catch((err) => console.log(err));

})
.catch((err) => console.log(err));	
	
	/*

	//FOR PREVIOUS lesson without operation.js file

	
	const collection = db.collection("dishes");
	collection.insertOne({"name": "pasta", "description": "yummy pasta with cheese" }, (err, result) => 
	{
		assert.equal(err, null);

		console.log("After Insertion: ");
		console.log(result.ops);

		collection.find({}).toArray((err, docs) => 
		{
			console.log("Found: ");
			console.log(docs);

			db.dropCollection("dishes", (err, result) => 
			{
				assert.equal(err, null);

				client.close();

			});
		});
	});

	*/


