const request = require('supertest');
const { app, server } = require('../src/server');

afterAll(() => {
  server.close();
});

describe('POST /convert', () => {
  it('converts markdown to HTML', async () => {
    const res = await request(app)
      .post('/convert')
      .send({ markdown: '# Title' });
    expect(res.statusCode).toBe(200);
    expect(res.body.html.trim()).toBe('<h1>Title</h1>');
  });
});
