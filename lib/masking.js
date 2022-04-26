const consoleLog = console.log.bind(console);

function consoleAppender(layout, timezoneOffset) {
    return loggingEvent => {
        const {
            startTime,
            categoryName,
            data,
            level,
            context
        } = loggingEvent;

        let lib = require("./keywords")
        let keywords = lib.keywords
        let maskedData = JSON.parse(JSON.stringify(data[0])) || {}

        if (typeof(maskedData) === "string") {
            for (let key in keywords) {
                if (maskedData.includes(key)) {
                    maskedData = maskedData.replace(keywords[key], "*******")
                }
            }
            data[0] = maskedData
            consoleLog(layout(loggingEvent, timezoneOffset))
        } else if (typeof(maskedData) === "object") {

            for (let key in keywords) {
                if (maskedData[key]) {
                    maskedData[key] = "*******"
                }
            }
            data[0] = maskedData
            consoleLog(layout(loggingEvent, timezoneOffset))
        }
    };
}

function configure(config, layouts) {
    let layout = layouts.colouredLayout;
    if (config.layout) {
        layout = layouts.layout(config.layout.type, config.layout);
    }
    return consoleAppender(layout, config.timezoneOffset);
}

module.exports.configure = configure;
