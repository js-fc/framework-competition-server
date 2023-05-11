var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const fs = require('fs'), nano = require('../couch-db/couch');
class CalibrationService {
    getCalibration(req) {
        const calibrationUlid = req.params.calibrationId;
        const frameworkUlid = req.params.frameworkId;
        return new Promise((resolve, reject) => {
            const db = nano.use('frameworks');
            db.get(`${calibrationUlid}:calibration:${frameworkUlid}`).then(calibration => {
                return resolve(calibration);
            }).catch(err => resolve(err));
        });
    }
    createCalibration(data, calibrationUlid, frameworkUlid) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = nano.use('frameworks');
            return db.insert(data, `${calibrationUlid}:calibration:${frameworkUlid}`);
        });
    }
    updateCalibration(data) {
        return new Promise((res, rej) => {
            fs.writeFile('data.json', JSON.stringify(data), (err, response) => {
                if (err)
                    return res(false);
                return res({ message: 'User updated.' });
            });
        });
    }
    deleteCalibration(data) {
        return new Promise((res, rej) => {
            fs.writeFile('data.json', JSON.stringify(data), (err, response) => {
                if (err)
                    return res(false);
                return res({ message: 'User deleted.' });
            });
        });
    }
}
module.exports = new CalibrationService();
//# sourceMappingURL=calibration.service.js.map