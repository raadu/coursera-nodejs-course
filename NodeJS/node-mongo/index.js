const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const url = "mongodb://localhost:27017/";
const dbname = "conFusion";
const dboper = require("./operations");

MongoClient.connect(url, (err, client) => 
{
	assert.equal(err, null);

	console.log("Connected correctly to the server");

	const db = client.db(dbname);

	dboper.insertDocument(db, { name: "Vadonut", description: "Test"},
        "dishes", (result) => {
            console.log("Insert Document:\n", result.ops);

            dboper.findDocuments(db, "dishes", (docs) => {
                console.log("Found Documents:\n", docs);

                dboper.updateDocument(db, { name: "Vadonut" }, { description: "Updated Test" }, "dishes", (result) => {
                        console.log("Updated Document:\n", result.result);

                        dboper.findDocuments(db, "dishes", (docs) => {
                            console.log("Found Updated Documents:\n", docs);
                            
                            db.dropCollection("dishes", (result) => {
                                console.log("Dropped Collection: ", result);

                                client.close();
                            });
                        });
                    });
            });
    });
	
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
});
