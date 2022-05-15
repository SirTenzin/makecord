var colours = require("colours");

class Logger {

    constructor() {}

    /**
     * Log an error.
     * @param {String} msg Message to log.
     * @returns {console}
     * @function
     */
    error(msg) {
        return console.log(colours.red(`[error]: `) + msg);
    }

    /**
     * Log info.
     * @param {String} msg Message to log.
     * @returns {console}
     * @function
     */
    info(msg) {
        return console.log(colours.blue(`[info]: `) + msg);
    }

    /**
     * Log a success.
     * @param {String} msg Message to log.
     * @returns {console}
     * @function
     */
    success(msg) {
        return console.log(colours.green(`[success]: `) + msg);
    }

    /**
     * Log a warning.
     * @param {String} msg Message to log.
     * @returns {console}
     * @function
     */
    warn(msg) {
        return console.log(colours.yellow(`[warn]: `) + msg);
    }

    /**
     * Log a message.
     * @param {String} msg Message to log.
     * @returns {console}
     * @function
     */
    out(msg) {
        return console.log(colours.blue(`[out]: `) + msg);
    };

}

module.exports = new Logger();