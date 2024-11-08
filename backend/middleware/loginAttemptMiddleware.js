import LoginAttempt from '../models/LoginAttempt.js';

const loginAttemptLogger = async (req, res, next) => {

    const originalJson = req.json;
    res.json = function(data) {
        const userName = req.body.email;
        const ipAddress = req.id || req.connection.remoteAddress;
        const successLogin = !data.message || data.message !== "Invalid User credentials";

        LoginAttempt.create({ userName, ipAddress, successLogin })
        .catch(err => console.error("Error logging Login attempt: ", err));

        originalJson.call(this, data);
    }
    next();
}

export default loginAttemptLogger;