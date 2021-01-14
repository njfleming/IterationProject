const request = require("supertest");

const server = "http://localhost:8080";

describe("Product Route Integration", () => {
  describe("GET /products", () => {
    it("responds with 200 status and application/json content type", () =>
      request(server)
        .get("/api/products/1")
        .expect("Content-Type", /application\/json/)
        .expect(200));

    it("returns an Object with the Property 'products'", () =>
      request(server)
        .get("/api/products/1")
        .then((res) => expect(res.body).toHaveProperty("products")));

    it("'products' contains and array that includes and Object containing : _id, user_id, product_id, product_name, image_url and the appropriate data types", () =>
      request(server)
        .get("/api/products/1")
        .then((res) => {
          const array = res.body.products;
          // expect(expect.arrayContaining(expect.anything()));
          return expect(array[0]).toMatchObject({
            _id: expect.any(Number),
            user_id: expect.any(Number),
            product_id: expect.any(Number),
            product_name: expect.any(String),
            image_url: expect.any(String),
          });
        }));
  });

  describe("POST /products", () => {
    it("responds with 200 status and application/json content type", () => {
      const url = {
        google_url:
          "https://www.google.com/shopping/product/18187242513988350226",
      };
      return request(server)
        .post("/api/products/1")
        .send(url)
        .expect("Content-Type", /application\/json/)
        .expect(200);
    });

    it("returns with the String 'Added product'", () => {
      const url = {
        google_url:
          "https://www.google.com/shopping/product/18187242513988350226",
      };
      return request(server)
        .post("/api/products/1")
        .send(url)
        .then((res) => expect(res.body).toEqual("Added product"));
    });
  });

  describe("DELETE /products", () => {
    it("responds with 200 status and application/json content type", () =>
      request(server)
        .delete("/api/products/1/24")
        .expect("Content-Type", /application\/json/)
        .expect(200));

    it("returns with the String 'Delete product'", () =>
      request(server)
        .delete("/api/products/1/24")
        .then((res) => expect(res.body).toEqual("Delete product")));
  });
});
