// elasticsearch.js
const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({ host: 'localhost:9200' });

// // Create an Elasticsearch index
// client.indices.create({
//   index: 'products',
//   body: {
//     mappings: {
//       properties: {
//         name: { type: 'text' },
//         description: { type: 'text' },
//         // Other properties
//       },
//     },
//   },
// });

module.exports = client;
