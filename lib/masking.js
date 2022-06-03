const consoleLog = console.log.bind(console);

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}


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
        for (let i = 0; i < data.length; i++) {
            if (typeof (maskedData) === "string") {
                for (let key in keywords) {
                    if (maskedData.includes(key)) {
                        maskedData = maskedData.replace(new RegExp(escapeRegExp(keywords[key]), 'g'), "*******")
                    }
                }
                data[0] = maskedData
            } else if (typeof (maskedData) === "object") {

                for (let key in keywords) {
                    if (maskedData[key]) {
                        maskedData[key] = "*******"
                    }
                }
                data[0] = maskedData

            }
        }
        consoleLog(layout(loggingEvent, timezoneOffset))
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
