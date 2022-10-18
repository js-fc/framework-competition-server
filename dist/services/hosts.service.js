const fs = require('fs'), nano = require('../couch-db/couch'), spawn = require('child_process').spawn;
class HostsService {
    getHosts() {
        return new Promise((res, rej) => {
            //nano.db.list().then(result => res(result), err => res(err))
            //res(db)
            const db = nano.use('frameworks');
            db.partitionedList('host').then(hostList => {
                // hostList.forEach(host => {
                //   console.log(host)
                // })
                return res(hostList);
            }).catch(err => res(err));
            // db.get('e7e673a901d10dfc1f3bdd670d0afbfa').then(
            //   result => res(result)
            // ).catch(err => res(err))
            // const progToOpen = spawn('C:\\windows\\notepad.exe', ["D:/1.txt"]);
            //const progToOpen = spawn('C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',["https://js-fc.github.io/js-framework-competition/all.html"]);
            // fs.readFile('dist/data.json', (err, data) => {
            //   if (err) {
            //      return res(false)
            //   }
            //   return res(JSON.parse(data.toString()))
            // })
        });
    }
    createHost(data) {
        return new Promise((res, rej) => {
            fs.writeFile('data.json', JSON.stringify(data), (err, response) => {
                if (err)
                    return res(false);
                return res({ message: 'User created.' });
            });
        });
    }
    updateHost(data) {
        return new Promise((res, rej) => {
            fs.writeFile('data.json', JSON.stringify(data), (err, response) => {
                if (err)
                    return res(false);
                return res({ message: 'User updated.' });
            });
        });
    }
    deleteHost(data) {
        return new Promise((res, rej) => {
            fs.writeFile('data.json', JSON.stringify(data), (err, response) => {
                if (err)
                    return res(false);
                return res({ message: 'User deleted.' });
            });
        });
    }
}
module.exports = new HostsService();
//# sourceMappingURL=hosts.service.js.map