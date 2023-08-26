import test from 'node:test'
import assert from 'node:assert'

test('Openapi working fine', async t => {
    const response = await fetch('http://localhost:8080/openapi')

    await t.test('should be ok', () => {
      assert.ok(response.ok)
    });
  
    const json = await response.json()
  
    await t.test('should be an object', () => {
      assert.equal(typeof json, 'object')
    });
  
    await t.test('checking object members', () => {
      const keys = Object.keys(json)
  
      assert.ok(keys.includes('openapi'))
      assert.ok(keys.includes('info'))
      assert.ok(keys.includes('paths'))
      assert.ok(keys.includes('components'))
  
      assert.strictEqual(typeof json.openapi, 'string')
      assert.strictEqual(typeof json.info, 'object')
      assert.strictEqual(typeof json.paths, 'object')
      assert.strictEqual(typeof json.components, 'object')
    });
  
  });