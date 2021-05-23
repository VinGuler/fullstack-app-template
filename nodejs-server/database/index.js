const mysql = require('mysql')
const db_credentials = require('./db_credentials.json')

class Database {
  constructor() {
    this.connection = mysql.createConnection(db_credentials)
    // This is a test to run just checking the query functions are all working
    // this.testQueries()
  }
  async testQueries() {
    this.connection.connect()

    const table = 'testtable'
    console.log('select - 1', await this.select({ table }))

    const { insertId } = await this.insert({ table, values: { 'column_1': 'value-9-1', 'column_2': 'value-9-2', 'column_3': 'value-9-3' } })
    console.log('insert - insertId', insertId)
    console.log('select - 2', await this.select({ table }))

    const { affectedRows: affectedRowsUpdate } = await this.update({ table, values: { 'column_1': 'Updated New Value' }, where: { id: insertId } })
    console.log('update - affectedRowsUpdate', affectedRowsUpdate)
    console.log('select - 3', await this.select({ table }))

    const { affectedRows: affectedRowsDelete } = await this.delete({ table, where: { id: insertId } })
    console.log('delete - affectedRowsDelete', affectedRowsDelete)
    console.log('select - 4 - final', await this.select({ table }))

    this.connection.end()
  }
  query(query, params) {
    return new Promise((resolve, reject) => {
      console.log('query', query)
      console.log('params', params)
      this.connection.query(query, params, (error, results, fields) => {
        if (error) {
          return reject(error)
        }
        resolve(results)
      })
    })
  }
  select({ table, columns = null, where = null }) {
    return new Promise((resolve) => {
      const cols = !columns ? '*' : columns.join(', ')
      const params = []
      let condition = '1=1'
      if (where) {
        condition = []
        for (const key in where) {
          condition.push(`${key} = ?`)
          params.push(where[key])
        }
      }
      const query = `SELECT ${cols} FROM ${table} WHERE ${condition}`
      this.query(query, params)
        .then((results) => {
          resolve(results)
        })
        .catch((error) => {
          console.log('error in select:', error)
          console.log('query:', query)
          resolve([])
        })
    })
  }
  insert({ table, values = null }) {
    return new Promise((resolve, reject) => {
      if (!values) {
        return reject(new Error('nothing to insert... "values" is empty'))
      }
      const params = []
      const column_strings = Object.keys(values)
      const value_strings = []
      column_strings.forEach((column) => {
        value_strings.push('?')
        params.push(values[column])
      })
      const final_columns = column_strings.join(', ')
      const final_values = value_strings.join(', ')
      const query = `INSERT INTO ${table} (${final_columns}) VALUES (${final_values})`
      this.query(query, params)
        .then((results) => {
          resolve(results)
        })
        .catch((error) => {
          console.log('error in insert:', error)
          console.log('query:', query)
          resolve({})
        })
    })
  }
  update({ table, values = null, where = null }) {
    return new Promise((resolve) => {
      if (!values) {
        return reject(new Error('nothing to update... "values" is empty'))
      }
      const params = []
      
      // VALUES
      const value_strings = []
      for (const column in values) {
        value_strings.push('?? = ?')
        params.push(column, values[column])
      }
      const values_final_string = value_strings.join(', ')

      // WHERE CONDITIONS
      let where_final_string = ''
      const condition = []
      if (where) {
        for (const key in where) {
          condition.push(`?? = ?`)
          params.push(key, where[key])
        }
        where_final_string = `WHERE ${condition.join('')}`
      }
      
      const query = `UPDATE ${table} SET ${values_final_string}${where_final_string} `
      this.query(query, params)
        .then((results) => {
          resolve(results)
        })
        .catch((error) => {
          console.log('error in update:', error)
          console.log('query:', query)
          resolve([])
        })
    })
  }
  delete({ table, where = null }) {
    return new Promise((resolve, reject) => {
      if (!where) {
        reject(new Error('must supply with WHERE condition to delete'))
      }
      const params = []
      const condition = []
      for (const key in where) {
        condition.push(`${key} = ?`)
        params.push(where[key])
      }
      const query = `DELETE FROM ${table} WHERE ${condition}`
      this.query(query, params)
        .then((results) => {
          resolve(results)
        })
        .catch((error) => {
          console.log('error in delete:', error)
          console.log('query:', query)
          resolve({})
        })
    })
  }
}

module.exports = Database
