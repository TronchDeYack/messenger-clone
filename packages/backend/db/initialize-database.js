const { Client } = require('pg')

function initializeDatabase () {
  const client = new Client({
    host: '127.0.0.1',
    port: 5432,
    user: 'slack',
    password: 'slack123',
  })

  client.connect(err => {
    if (err) {
      console.error('Error while connecting to the database', err)
    } else {
      client.query('CREATE DATABASE slack_development', (err, res) => {
        client.end()
      })
    }
  })
}

initializeDatabase()