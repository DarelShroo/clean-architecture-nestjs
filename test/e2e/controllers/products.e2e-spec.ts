import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../src/app.module';

describe('ProductController (e2e)', () => {
  let app: INestApplication;
  let createdProductId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/products (POST)', () => {
    it('should create a new product', () => {
      return request(app.getHttpServer())
        .post('/products')
        .send({
          name: 'Test Laptop',
          description: 'High performance test laptop',
          price: 1299.99,
          stock: 25,
        })
        .expect(201)
        .then((response) => {
          expect(response.body).toHaveProperty('id');
          expect(response.body.name).toBe('Test Laptop');
          expect(response.body.price).toBe(1299.99);
          expect(response.body.stock).toBe(25);
          createdProductId = response.body.id;
        });
    });

    it('should fail with invalid data', () => {
      return request(app.getHttpServer())
        .post('/products')
        .send({
          name: '',
          description: 'Invalid product',
          price: -100,
          stock: 10,
        })
        .expect(400);
    });
  });

  describe('/products (GET)', () => {
    it('should return all products', () => {
      return request(app.getHttpServer())
        .get('/products')
        .expect(200)
        .then((response) => {
          expect(Array.isArray(response.body)).toBe(true);
          expect(response.body.length).toBeGreaterThan(0);
        });
    });
  });

  describe('/products/:id (GET)', () => {
    it('should return a product by id', () => {
      return request(app.getHttpServer())
        .get(`/products/${createdProductId}`)
        .expect(200)
        .then((response) => {
          expect(response.body.id).toBe(createdProductId);
          expect(response.body.name).toBe('Test Laptop');
        });
    });

    it('should return 400 for non-existent product', () => {
      return request(app.getHttpServer())
        .get('/products/non-existent-id')
        .expect(400);
    });
  });

  describe('/products/:id (PUT)', () => {
    it('should update a product', () => {
      return request(app.getHttpServer())
        .put(`/products/${createdProductId}`)
        .send({
          name: 'Updated Laptop',
          description: 'Updated description',
          price: 1499.99,
        })
        .expect(200)
        .then((response) => {
          expect(response.body.name).toBe('Updated Laptop');
          expect(response.body.price).toBe(1499.99);
        });
    });
  });

  describe('/products/:id/increase-stock (PATCH)', () => {
    it('should increase product stock', () => {
      return request(app.getHttpServer())
        .patch(`/products/${createdProductId}/increase-stock`)
        .send({ quantity: 15 })
        .expect(200)
        .then((response) => {
          expect(response.body.stock).toBe(40); // 25 + 15
        });
    });
  });

  describe('/products/:id/decrease-stock (PATCH)', () => {
    it('should decrease product stock', () => {
      return request(app.getHttpServer())
        .patch(`/products/${createdProductId}/decrease-stock`)
        .send({ quantity: 10 })
        .expect(200)
        .then((response) => {
          expect(response.body.stock).toBe(30); // 40 - 10
        });
    });
  });

  describe('/products/:id (DELETE)', () => {
    it('should delete a product', () => {
      return request(app.getHttpServer())
        .delete(`/products/${createdProductId}`)
        .expect(204);
    });
  });
});
