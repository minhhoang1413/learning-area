/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const agg = [
    {
        '$match': {
            'product': new ObjectId('61dd50301d14a233c9b7b5ff')
        }
    }, {
        '$group': {
            '_id': null,
            'avgRating': {
                '$avg': '$rating'
            },
            'numberOfReviews': {
                '$sum': 1
            }
        }
    }
];

MongoClient.connect(
    '',
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (connectErr, client) {
        assert.equal(null, connectErr);
        const coll = client.db('').collection('');
        coll.aggregate(agg, (cmdErr, result) => {
            assert.equal(null, cmdErr);
        });
        client.close();
    });