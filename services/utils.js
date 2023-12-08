const { to } = require('await-to-js');
const pe = require('parse-error');

module.exports.to = async (promise) => {
    let err, res;
    [err, res] = await to(promise);
    if (err) return [pe(err)];

    return [null, res];
};

module.exports.ReE = function (res, err, code, appCode) { // Error Web Response
    if (typeof err == 'object' && typeof err.message != 'undefined') {
        err = err.message;
    }
    let appCodeResult = 0;
    if (typeof code !== 'undefined') res.statusCode = code;

    if (typeof appCode !== 'undefined') appCodeResult = appCode;

    return res.json({ success: false, error: err, appCode: appCodeResult });
};

module.exports.ReS = function (res, data, code, userLog) { // Success Web Response
    let send_data = { success: true };

    if (typeof data == 'object') {
        send_data = Object.assign(data, send_data);//merge the objects
    }

    if (typeof code !== 'undefined') res.statusCode = code;

    return res.json(send_data)
};

module.exports.TE = TE = function (err_message, log) { // TE stands for Throw Error
    if (log === true) {
        console.error(err_message);
    }

    throw new Error(err_message);
};


