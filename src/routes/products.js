// routes/products.js
const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const elasticsearchClient = require("../elasticsearch/elasticsearch");

// Create a new product
router.post("/products", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();

    const { _id, restBody } = product;
    // Sync with Elasticsearch
    elasticsearchClient.index({
      index: "products",
      body: req.body,
    });

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create product" });
  }
});
router.get("/products/search", async (req, res) => {
  try {
    const { search, maxPrice, minPrice } = req.query;
    // Initialize the query as a "bool" query with the "range" query
    const query = {
      bool: {
        must: [
          {
            range: {
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
            },
          },
        ],
      },
    };

    // Conditionally add the "multi_match" query if "search" is provided
    if (search) {
      query.bool.must.push({
        multi_match: {
          fields: ["name", "description"],
          query: search,
          type: "phrase_prefix",
        },
      });
    }

    // Perform the Elasticsearch search
    const result = await elasticsearchClient.search({
      index: "products",
      body: {
        query,
        highlight: {
          fields: {
            name: {},
            description: {},
          },
        },
      },
    });

    const products = result.hits.hits.map((hit) => hit._source);
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to search for products" });
  }
});



// Add other routes for searching, updating, and deleting products
module.exports = router;
