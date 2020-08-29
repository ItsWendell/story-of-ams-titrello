import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const gql = '/graphql';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(() => {
    app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe(gql, () => {
    let project;
    describe('projects', () => {
      it('should create a project', () => {
        return request(app.getHttpServer())
          .post(gql)
          .send({
            query: /* GraphQL */ `
              {
                createProject(name: "Hello World") {
                  id
                  name
                }
              }
            `,
          })
          .expect(200)
          .expect(res => {
            expect(res.body.data.createProject.id).toBeDefined();
            expect(res.body.data.createProject.name).toBe('Hello World');
          })
          .then(res => {
            project = res.body?.data;
          });
      });
    });
  });
});
