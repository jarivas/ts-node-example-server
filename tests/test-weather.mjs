import test from 'node:test'
import assert from 'node:assert'

function validateWeather(weather) {
  const keys = Object.keys(weather)

  assert.ok(keys.includes('type'))
  assert.ok(keys.includes('temperature'))
  assert.ok(keys.includes('isCelsius'))

  assert.strictEqual(typeof weather.type, 'string')
  assert.strictEqual(typeof weather.temperature, 'number')
  assert.strictEqual(typeof weather.isCelsius, 'boolean')
}

test('Weather working fine', async t => {
  const response = await fetch('http://localhost:8080/weather/malaga')

  await t.test('should be ok', () => {
    assert.ok(response.ok)
  });

  const json = await response.json()

  await t.test('should be an object', () => {
    assert.equal(typeof json, 'object')
  });

  await t.test('checking object members', () => {
    const keys = Object.keys(json)

    assert.ok(keys.includes('city'))
    assert.ok(keys.includes('today'))
    assert.ok(keys.includes('nextDays'))
    assert.ok(keys.includes('averageTemperature'))

    assert.strictEqual(typeof json.city, 'string')
    assert.strictEqual(typeof json.today, 'object')
    assert.ok(Array.isArray(json.nextDays))
    assert.strictEqual(typeof json.averageTemperature, 'number')
  });

  await t.test('checking today members', () => {
    validateWeather(json.today)
  });

  await t.test('checking nextDays members', () => {
    json.nextDays.forEach(day => validateWeather(day));
  });
});

test('Weather not found', async t => {
  const response = await fetch('http://localhost:8080/weather/malaga1')

  await t.test('should be 404', () => {
    assert.equal(response.status, 404)
  });

  const json = await response.json()

  await t.test('should be an object', () => {
    assert.equal(typeof json, 'object')
  });

  await t.test('checking object members', () => {
    const keys = Object.keys(json)

    assert.ok(keys.includes('code'))
    assert.ok(keys.includes('message'))

    assert.strictEqual(typeof json.code, 'string')
    assert.strictEqual(typeof json.message, 'string')
    
    assert.strictEqual(json.code, 'NotFound')
    assert.strictEqual(json.message, 'City not found')
  });
}); 

test('Weather no city', async t => {
  const response = await fetch('http://localhost:8080/weather')

  await t.test('should be 404', () => {
    assert.equal(response.status, 404)
  });

  const json = await response.json()

  await t.test('should be an object', () => {
    assert.equal(typeof json, 'object')
  });

  await t.test('checking object members', () => {
    const keys = Object.keys(json)

    assert.ok(keys.includes('code'))
    assert.ok(keys.includes('message'))

    assert.strictEqual(typeof json.code, 'string')
    assert.strictEqual(typeof json.message, 'string')
    
    assert.strictEqual(json.code, 'ResourceNotFound')
    assert.strictEqual(json.message, '/weather does not exist')
  });
}); 