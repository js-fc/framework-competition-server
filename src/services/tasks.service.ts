const fs = require('fs'),
  nano = require('../couch-db/couch')

class TasksService {
  getTasks(taskUlid) {
    return new Promise((resolve, reject) => {
      const db = nano.use('frameworks')
      db.partitionedList('task',{ include_docs: true, limit: 5, startkey: 'task:01GM37FBV3SS38SCAGFD0ZC3JY:framework:01GJFRHJ6M5DQX9AE0CXXC6H05', endkey: 'task:01GM37FBV3SS38SCAGFD0ZC3JY:framework:f'}).then(taskList =>
      {
        return resolve(taskList)
      }).catch( err => resolve(err))
    })
  }

  createTask(data) {
    return new Promise((res, rej) => {
      fs.writeFile(
        'data.json',
        JSON.stringify(data),
        (err, response) => {
          if (err) return res(false)

          return res({ message: 'User created.' })
        }
      )
    })
  }

  updateTask(data) {
    return new Promise((res, rej) => {
      fs.writeFile(
        'data.json',
        JSON.stringify(data),
        (err, response) => {
          if (err) return res(false)

          return res({ message: 'User updated.' })
        }
      )
    })
  }

  deleteTask(data) {
    return new Promise((res, rej) => {
      fs.writeFile(
        'data.json',
        JSON.stringify(data),
        (err, response) => {
          if (err) return res(false)
          return res({ message: 'User deleted.' })
        }
      )
    })
  }
}

export = new TasksService()