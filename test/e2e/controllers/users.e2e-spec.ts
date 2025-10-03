import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../src/app.module';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let createdUserId: string;

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

  describe('/users (POST)', () => {
    it('should create a new user', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send({
          name: 'Alice Smith',
          email: 'alice@test.com',
        })
        .expect(201)
        .then((response) => {
          expect(response.body).toHaveProperty('id');
          expect(response.body.name).toBe('Alice Smith');
          expect(response.body.email).toBe('alice@test.com');
          expect(response.body.isActive).toBe(true);
          createdUserId = response.body.id;
        });
    });

    it('should fail with invalid email', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send({
          name: 'Invalid User',
          email: 'invalid-email',
        })
        .expect(400);
    });
  });

  describe('/users (GET)', () => {
    it('should return all users', () => {
      return request(app.getHttpServer())
        .get('/users')
        .expect(200)
        .then((response) => {
          expect(Array.isArray(response.body)).toBe(true);
          expect(response.body.length).toBeGreaterThan(0);
        });
    });
  });

  describe('/users/:id (GET)', () => {
    it('should return a user by id', () => {
      return request(app.getHttpServer())
        .get(`/users/${createdUserId}`)
        .expect(200)
        .then((response) => {
          expect(response.body.id).toBe(createdUserId);
          expect(response.body.name).toBe('Alice Smith');
        });
    });

    it('should return 400 for non-existent user', () => {
      return request(app.getHttpServer())
        .get('/users/non-existent-id')
        .expect(400);
    });
  });

  describe('/users/:id (PUT)', () => {
    it('should update a user', () => {
      return request(app.getHttpServer())
        .put(`/users/${createdUserId}`)
        .send({
          name: 'Alice Johnson',
          email: 'alice.johnson@test.com',
        })
        .expect(200)
        .then((response) => {
          expect(response.body.name).toBe('Alice Johnson');
          expect(response.body.email).toBe('alice.johnson@test.com');
        });
    });
  });

  describe('/users/:id/deactivate (PATCH)', () => {
    it('should deactivate a user', () => {
      return request(app.getHttpServer())
        .patch(`/users/${createdUserId}/deactivate`)
        .expect(200)
        .then((response) => {
          expect(response.body.isActive).toBe(false);
        });
    });
  });

  describe('/users/:id/activate (PATCH)', () => {
    it('should activate a user', () => {
      return request(app.getHttpServer())
        .patch(`/users/${createdUserId}/activate`)
        .expect(200)
        .then((response) => {
          expect(response.body.isActive).toBe(true);
        });
    });
  });

  describe('/users/:id (DELETE)', () => {
    it('should delete a user', () => {
      return request(app.getHttpServer())
        .delete(`/users/${createdUserId}`)
        .expect(204);
    });
  });
});
