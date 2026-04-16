const request = require('supertest')
const app = require('../server') // exporta tu app de Express

describe('POST /api/auth/login', () => {
  test('devuelve 400 si faltan campos', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({})
    expect(res.statusCode).toBe(400)
  })

  test('devuelve 401 con credenciales incorrectas', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'noexiste@test.com', password: 'wrongpass' })
    expect(res.statusCode).toBe(401)
  })

  test('devuelve token con credenciales correctas', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'alexamorpaypal@gmail.com', password: '' })
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('token') 
  })
})
