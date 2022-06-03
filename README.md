# log4js-masking-appender

This is a Javascript masking appender for [log4js](https://www.npmjs.com/package/log4js). It is used to mask confidential information in string and objects before console logging it, but it doesn't change the original input.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install log4js-masking-appender.

```bash
npm install log4js --save
npm install log4js-masking-appender-new --save
```

## Usage

```javascript
const log4js = require("log4js");

log4js.configure({
  appenders: {
    console: {type: 'console'},
    masking: {
      type: 'log4js-masking-appender-new',
    },
  },
  categories: {
    default: {appenders: ['masking'], level: 'ALL'},
  },
});
 
logger = log4js.getLogger();

// Example of Object Masking

let obj = {
  "mobile": "123456789",
  "FullName": "Hello World!!",
  "District": "La Jolla, San Diego" 
} 

// Case (1)
logger.info(obj)
// Case (2)
logger.error(obj)

```
Expected output

```bash
# Case (1)
[2020-11-15T13:56:57.886] [INFO] default - { mobile: '123456789', FullName: '*******', District: '*******' }
# Case (2)
[2020-11-15T13:56:57.892] [ERROR] default - { mobile: '123456789', FullName: '*******', District: '*******' }
```

## Current Masking Information
Please recommend any keyowrds to be added, below are the ones included currently 

```javascript
keywords = {
    "FullName",
    "FirstName",
    "LastName",
    "ContactInfo",
    "Gender",
    "District",
    "subscriberNo",
    "SubscriberNo",
    "CustomerNo",
    "NS1:CustomerNo",
    "serviceNumber",
    "callerId",
    "callerPassword",
    "username",
    "Username",
    "U",
    "P",
    "wsse:Username",
    "password",
    "wsse:Password",
    "Password",
    "fullphone",
    "FullPhone",
    "PhoneNumber",
    "adslNumber",
    "hostname",
    "port",
    "host",
    "CustomerContactNumber",
    "CustomerAccountNumber",
    "Authorization",
    "headers",
    "Followup_Number",
    "followup_Number",
    "tem:ServiceNumber",
    "CallerPassword",
    "CallerID",
    "authkey"
}
```



