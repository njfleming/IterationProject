const request = require("supertest");

const server = "http://localhost:8080";

describe("Auth Route Integration", () => {
  describe("POST /login", () => {
    it("responds with 200 status and application/json content type", () => {
      const user = {
        email: "armadilloshapeup@gmail.com",
        password: "armadi110",
      };
      return request(server)
        .post("/api/auth/login")
        .send(user)
        .expect("Content-Type", /application\/json/)
        .expect(200);
    });

    it("responds with Object containing user info", () => {
      const user = {
        email: "armadilloshapeup@gmail.com",
        password: "armadi110",
      };
      return request(server)
        .post("/api/auth/login")
        .send(user)
        .then((res) =>
          expect(res.body).toMatchObject({
            userId: 60,
            email: "armadilloshapeup@gmail.com",
          })
        );
    });
  });
});
