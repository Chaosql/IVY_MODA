import 'dotenv/config';
import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import pg from 'pg';

const { Client } = pg;
const baseUrl = process.env.TEST_BASE_URL || 'http://127.0.0.1:3000';
const ssl = process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false;

const client = new Client(process.env.DATABASE_URL
  ? { connectionString: process.env.DATABASE_URL, ssl }
  : {
      host: process.env.SQL_HOST,
      port: Number(process.env.SQL_PORT || 5432),
      user: process.env.SQL_USER,
      password: process.env.SQL_PASSWORD,
      database: process.env.SQL_DB_NAME,
    });

before(async () => {
  await client.connect();
});

after(async () => {
  await client.end();
});

test('IT-01: products API returns products stored in PostgreSQL', async () => {
  const dbResult = await client.query('SELECT prod_id, sku, name, price FROM products');
  assert.ok(dbResult.rows.length > 0, 'The database must contain seeded products');

  const response = await fetch(`${baseUrl}/api/products`);
  assert.equal(response.status, 200);
  const products = await response.json() as Array<{ id: string; sku: string; name: string; price: number }>;
  assert.equal(products.length, dbResult.rows.length);

  for (const row of dbResult.rows) {
    const product = products.find((item) => item.id === row.prod_id);
    assert.ok(product, `Product ${row.prod_id} must be returned by the API`);
    assert.equal(product.sku, row.sku);
    assert.equal(product.name, row.name);
    assert.equal(product.price, row.price);
  }
});

test('IT-02: categories API returns categories stored in PostgreSQL', async () => {
  const dbResult = await client.query('SELECT id, name FROM categories ORDER BY name');

  const response = await fetch(`${baseUrl}/api/categories`);
  assert.equal(response.status, 200);
  const categories = await response.json() as Array<{ id: number; name: string }>;
  assert.deepEqual(categories.map(({ id, name }) => ({ id, name })), dbResult.rows);
});
