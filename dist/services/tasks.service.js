const fs = require('fs'), nano = require('../couch-db/couch');
class TasksService {
    getTasks(taskUlid) {
        return new Promise((resolve, reject) => {
            const db = nano.use('frameworks');
            db.get('task:01GM37FBV3SS38SCAGFD0ZC3JY:framework:01GJFRHJ6M5DQX9AE0CXXC6H05').then(task => {
                return resolve(task);
            }).catch(err => resolve(err));
        });
    }
    createTask(data) {
        return new Promise((res, rej) => {
            fs.writeFile('data.json', JSON.stringify(data), (err, response) => {
                if (err)
                    return res(false);
                return res({ message: 'User created.' });
            });
        });
    }
    updateTask(data) {
        return new Promise((res, rej) => {
            fs.writeFile('data.json', JSON.stringify(data), (err, response) => {
                if (err)
                    return res(false);
                return res({ message: 'User updated.' });
            });
        });
    }
    deleteTask(data) {
        return new Promise((res, rej) => {
            fs.writeFile('data.json', JSON.stringify(data), (err, response) => {
                if (err)
                    return res(false);
                return res({ message: 'User deleted.' });
            });
        });
    }
}
module.exports = new TasksService();
//# sourceMappingURL=tasks.service.js.map