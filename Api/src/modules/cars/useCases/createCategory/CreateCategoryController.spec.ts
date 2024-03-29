import { hash } from "bcryptjs";
import { v4 as uuidV4 } from "uuid";
import request from "supertest";
import { Connection } from "typeorm";
import { app } from "../../../../shared/infra/http/app";
import createConnection from "../../../../shared/infra/typeorm"


let connection: Connection;

describe("Create Category Controller", () => {

  beforeAll( async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash("admin", 8);

    await connection.query(
      `INSERT INTO users (id, name, email, password, "isAdmin", created_at, driver_license ) 
       values('${id}', 'admin', 'admin@hotmail.com', '${password}', true, 'now()', 'XXXXXX')
      `
    )
  })

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  })


  it("Should be able to create a new category", async () => {
    const responseToken = await request(app).post("/sessions")
    .send({
      email: 'admin@hotmail.com',
      password: 'admin',
    })

    const { refresh_token } = responseToken.body

    const response = await request(app).post("/categories").send({
      name: "Category supertest",
      description: "Category SuperTest",
    })
    .set({
      Authorization: `Bearer ${ refresh_token }`
    });

    expect(response.status).toBe(201);
  });

  it("Should not be able to create a new category with name exists", async () => {
    const responseToken = await request(app).post("/sessions")
    .send({
      email: 'admin@hotmail.com',
      password: 'admin',
    })

    const { refresh_token } = responseToken.body

    const response = await request(app).post("/categories").send({
      name: "Category supertest",
      description: "Category SuperTest",
    })
    .set({
      Authorization: `Bearer ${ refresh_token }`
    });

    expect(response.status).toBe(400);
  });
});
