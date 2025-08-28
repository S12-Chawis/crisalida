/*
 * Why we need this:
 * - Centralized logging system
 * - Different log levels for different environments
 * - File and console output
 * - Structured log format for monitoring tools
 */

const fs = require('fs');
const path = require('path');

class Logger {
    constructor() {
        this.logsDir = path.join(process.cwd(), 'logs');
        if (!fs.existsSync(this.logsDir)) {
            fs.mkdirSync(this.logsDir, { recursive: true });
        }

        // log file path
        this.logFile = path.join(this.logsDir, 'app.log');

        // Log levels (lower number = higher priority)
        this.levels = {
            error: 0,   // Critical errors
            warn: 1,    // Warning messages
            info: 2,    // General information
            debug: 3    // Debug information
        }

        // Current log level based on environment
        this.currentLevel = process.env.LOG_LEVEL || 'info';
    }

    /**
   * Get timestamp in ISO format
   */
    getTimestamp() {
        return new Date().toISOString();
    }

    /**
    * Format log message
    */
    formatMessage(level, message, meta = {}) {
        const logEntry = {
            timestamp: this.getTimestamp(),
            level: level.toUpperCase(),
            message,
            ...meta
        };

        // Add process information in development
        if (process.env.NODE_ENV === 'development') {
            logEntry.pid = process.pid;
        }

        return JSON.stringify(logEntry, null, process.env.NODE_ENV === 'development' ? 2 : 0);
    }

    /**
  * Check if we should log at this level
  */
    shouldLog(level) {
        return this.levels[level] <= this.levels[this.currentLevel];
    }

    /**
   * Write to log file
   */
    writeToFile(formattedMessage) {
        try {
            fs.appendFileSync(this.logFile, formattedMessage + '\n');
        } catch (err) {
            console.error('Failed to write log to file:', err.message);
        }
    }

    writeToConsole(level, formattedMessage) {
    if (process.env.NODE_ENV !== 'development') return;

    const colors = {
        error: '\x1b[31m',   // Red
        warn: '\x1b[33m',    // Yellow
        info: '\x1b[36m',    // Cyan
        debug: '\x1b[37m',   // White
        reset: '\x1b[0m'     // Reset
    };

    const colorCode = colors[level] || colors.reset;
    console.log(`${colorCode}${formattedMessage}${colors.reset}`);
}

    /**
   * Generic log method
   */
    log(level, message, meta = {}) {
        if (!this.shouldLog(level)) return;

        const formattedMessage = this.formatMessage(level, message, meta);

        // Always write to console in development

        if (process.env.NODE_ENV === 'development') {
            this.writeToConsole(level, formattedMessage);
        }

        // Always write to file in production
        if (process.env.NODE_ENV === 'production') {
            this.writeToFile(formattedMessage);
        }
    }

    /**
   * Error logging - highest priority
   */
    error(message, meta = {}) {
        // Include stack trace for errors
        if (meta instanceof Error) {
            meta = {
                error: meta.message,
                stack: meta.stack
            };
        }
        this.log('error', message, meta);
    }

    /**
   * Warning logging
   */
    warn(message, meta = {}) {
        this.log('warn', message, meta);
    }

    /**
   * Info logging - general information
   */
    info(message, meta = {}) {
        this.log('info', message, meta);
    }

    /**
   * Debug logging - detailed information
   */
    debug(message, meta = {}) {
        this.log('debug', message, meta);
    }

    /**
   * Request logging - for API calls
   */
    request(req, res, duration = 0) {
        const meta = {
            method: req.method,
            url: req.originalUrl,
            ip: req.ip || req.connection.remoteAddress,
            userAgent: req.get('User-Agent'),
            statusCode: res.statusCode,
            duration: `${duration}ms`
        };

        // Add user info if authenticated
        if (req.user) {
            meta.userId = req.user.id;
            meta.userEmail = req.user.email;
        }

        this.info(`${req.method} ${req.originalUrl}`, meta);
    }
}

// Create and export singleton instance
const logger = new Logger();
module.exports = logger;