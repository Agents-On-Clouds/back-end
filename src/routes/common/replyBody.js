module.exports = {
       /**
        * creates an error body to be sent to the user
        * @param {String} errorCode Error Code Name, Should be Unique
        * @param {String} message Message, Default = "Access Denied"
        * @param {Object} data Error data object. Optional
        * @returns 
        */
       error(errorCode, message = "Access Denied", data = {}) {
           return {
               "errorCode": errorCode,
               "message": message,
               "data": data,
               "status": 0
           }
       },
   
       /**
        * constructs a reply to the user in form of an object containing: errorCode (if any), message, data, apiErrorCode. 
        * Methods used are: done, errorCode (if a generic errorCode to be sent)
        * {String} errorCode errorCode code
        * {String} message message to send to the end user
        * {Object} data an object containing reply data to be sent to the user, default {}
        * {Boolean} status message status, 0 => error, 1 => success, Default is 1
        * {Boolean} autoMessage if true auto-generates a message if none provided, default false
        */
       done({ errorCode = "", message = "", data = {}, autoMessage = false, status = 1 }) {
           if (autoMessage) {
               if (message == "" && errorCode != "") {
                   message = "Access denied or Bad request"
               } else if (message == "" && errorCode == "") {
                   message = "Success"
               } else {
                   message = "Data Type Error"
               }
           }
           if (data == undefined) {
               data = {}
           }
           return {
               "errorCode": errorCode,
               "message": message,
               "data": data,
               "status": status
           }
       }
   };