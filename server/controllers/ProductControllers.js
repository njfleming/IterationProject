const priceTrackerDB = require('../models/priceTrackerModel.js');
const getProductInfo = require('../utils/productWebscraping.js');

const productController = {};

// Get Products Controller- GET Request:
productController.getProducts = (req, res, next) => {
  // This gets the user's products with the most recent timestamp:
  const userProducts = `SELECT DISTINCT ON (lowest_daily_price.product_id) *
  FROM users_to_products
    JOIN products ON users_to_products.product_id=products._id
    JOIN lowest_daily_price ON lowest_daily_price.product_id=products._id
  WHERE users_to_products.user_id=$1
  ORDER BY lowest_daily_price.product_id, lowest_daily_price.timestamp DESC;
  `;

  const values = [req.params.user];

  priceTrackerDB
    .query(userProducts, values)
    .then((data) => {
      res.locals.products = data.rows;
      return next();
    })
    .catch((err) => {
      console.log(err);
      return next(
        res.status(400).send(`ERROR in getProducts controller: ${err}`),
      );
    });
};

productController.updateTimestamp = (req, res, next) => {
  console.log(req);
  console.log('type of yesterday', typeof yesterday);
  const timestampQuery = `SELECT DISTINCT ON (lowest_daily_price.product_id, lowest_daily_price.timestamp) *
  FROM products
  JOIN lowest_daily_price ON lowest_daily_price.product_id=products._id
  ORDER BY lowest_daily_price.product_id,lowest_daily_price.timestamp DESC;`;

  priceTrackerDB
    .query(timestampQuery)
    .then((data) => {
      console.log('update timestamp data', data.rows);
      res.locals.currentproducts = data.rows;
      return next();
    })
    .catch((err) => {
      console.log(err);
      return next(
        res.status(400).send(`ERROR in updateTimestamp controller: ${err}`),
      );
    });
};

productController.filterTimes = (req, res, next) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  console.log('res.locals.currentproducts', res.locals.currentproducts);
  const filteredDates = res.locals.currentproducts.filter(
    // this has to be an async function
    (el) => new Date(el.timestamp) <= yesterday,
  );
  console.log('filteredDates', filteredDates);
  // need to handle null values check all values are correct
  scrapeURLs = async (filteredDates) => {
    for (const i in filteredDates) {
      let productInfo = {};
      console.log('el', filteredDates[i]);
      // Web scrape the google_url:
      try {
        productInfo = await getProductInfo(filteredDates[i].google_url); // Returns an object: {lowest_daily_price, product_name, store_url, store_name, image_url}
      } catch (err) {
        return next(
          res.status(400).send(`ERROR in getProductsInfo function: ${err}`),
        );
      }
      productInfo.google_url = filteredDates[i].google_url;

      const lowestDailyPriceQuery = 'INSERT into lowest_daily_price (product_id, timestamp, store_name, lowest_daily_price,	store_url) VALUES ($1,$2,$3,$4,$5)';
      const date = new Date().toDateString();
      const lowestDailyPriceValues = [
        filteredDates[i].product_id,
        date,
        productInfo.store_name,
        productInfo.lowest_daily_price,
        productInfo.store_url,
      ];
      try {
        const lowestDailyPriceInsert = await priceTrackerDB.query(
          lowestDailyPriceQuery,
          lowestDailyPriceValues,
        );

        return next();
      } catch (err) {
        console.log('error: ', err);
        return next(
          res.status(400).send(`ERROR in addProducts controller: ${err}`),
        );
      }
    }
  };
  scrapeURLs(filteredDates);
};
// Add Product Controller- POST Request:
productController.addProduct = async (req, res, next) => {
  // front end sends user_id and google_url only.  Then we use puppeteer to scrape the following:
  const { google_url, stores } = req.body; // from websraping and frontend
  const { user } = req.params;
  let productInfo = {};

  // Web scrape the google_url:
  try {
    productInfo = await getProductInfo(google_url, stores); // Returns an object: {lowest_daily_price, product_name, store_url, store_name, image_url}
  } catch (err) {
    return next(
      res.status(400).send(`ERROR in getProductsInfo function: ${err}`),
    );
  }

  // Add google_url to object:
  productInfo.google_url = google_url;

  // Query to check if the product is already in the products table.
  const productInTableQuery = 'SELECT * FROM products WHERE products.google_url=$1';
  const productInTable = await priceTrackerDB.query(productInTableQuery, [
    google_url,
  ]);
  let productId = '';

  if (productInTable.rows.length > 0) {
    // If already exist: add product_id to object
    productId = productInTable.rows[0]._id;
  } else {
    // If does not already exsit:
    // Add to products table and return product_id. Then add product_id to object
    const newProductId = await priceTrackerDB.query(
      'INSERT INTO products (product_name, image_url, google_url) VALUES ($1,$2,$3) returning products._id',
      [productInfo.product_name, productInfo.image_url, productInfo.google_url],
    );
    productId = newProductId.rows[0]._id;
  }

  // Add to user_to_products table using product_id:
  const usersToProductsQuery = 'INSERT into users_to_products (user_id,product_id) VALUES ($1,$2)';
  const usersToProductsValues = [user, productId];

  // Add to lowest_daily_price table using product_id:
  const lowestDailyPriceQuery = 'INSERT into lowest_daily_price (product_id, timestamp, store_name, lowest_daily_price,	store_url) VALUES ($1,$2,$3,$4,$5)';
  const date = new Date().toDateString();
  const lowestDailyPriceValues = [
    productId,
    date,
    productInfo.store_name,
    productInfo.lowest_daily_price,
    productInfo.store_url,
  ];
  try {
    const userToProductsInsert = await priceTrackerDB.query(
      usersToProductsQuery,
      usersToProductsValues,
    );
    const lowestDailyPriceInsert = await priceTrackerDB.query(
      lowestDailyPriceQuery,
      lowestDailyPriceValues,
    );

    return next();
  } catch (err) {
    console.log('error: ', error);
    return next(
      res.status(400).send(`ERROR in addProducts controller: ${err}`),
    );
  }
};

// Delete Product Controller- DELETE Request:
productController.deleteProduct = (req, res, next) => {
  const { user, id } = req.params;

  const deleteProductFromUser = 'DELETE FROM users_to_products WHERE user_id=$1 AND product_id=$2';

  const values = [user, id];

  priceTrackerDB
    .query(deleteProductFromUser, values)
    .then((data) => next())
    .catch((err) => {
      console.log(err);
      return next(
        res.status(400).send(`ERROR in deleteProducts controller: ${err}`),
      );
    });
};

module.exports = productController;
