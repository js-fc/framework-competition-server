const settingDB = require('../config/config').db, nano = require('nano')(`${settingDB.scheme}://${settingDB.login}:${settingDB.password}@${settingDB.server}:${settingDB.port}`);
module.exports = nano;
//# sourceMappingURL=couch.js.map