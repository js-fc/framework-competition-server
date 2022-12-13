const fs = require('fs'), nano = require('../couch-db/couch');
class FrameworksService {
    getFrameworks() {
        return new Promise((res, rej) => {
            const db = nano.use('frameworks');
            db.partitionedList('framework', { include_docs: true }).then(frameworkList => {
                return res(frameworkList);
            }).catch(err => res(err));
        });
    }
    createFramework(data) {
        return new Promise((res, rej) => {
            fs.writeFile('data.json', JSON.stringify(data), (err, response) => {
                if (err)
                    return res(false);
                return res({ message: 'User created.' });
            });
        });
    }
    updateFramework(data) {
        return new Promise((res, rej) => {
            fs.writeFile('data.json', JSON.stringify(data), (err, response) => {
                if (err)
                    return res(false);
                return res({ message: 'User updated.' });
            });
        });
    }
    deleteFramework(data) {
        return new Promise((res, rej) => {
            fs.writeFile('data.json', JSON.stringify(data), (err, response) => {
                if (err)
                    return res(false);
                return res({ message: 'User deleted.' });
            });
        });
    }
}
module.exports = new FrameworksService();
//# sourceMappingURL=frameworks.service.js.map