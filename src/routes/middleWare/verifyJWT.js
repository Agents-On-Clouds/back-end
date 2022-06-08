const replyBody = require("../common/replyBody");
const { Users } = require("../../models/index");

module.exports = async (req, res , next) => {
       if (!req.headers.authorization) {
              return res.status(401).json(replyBody.error("Registration_Authorization_Missing_Header", "Authorization Header Missing"));
       } else {
              // let token = req.headers["access-token"];
              token = req.headers.authorization.split(' ').pop();
              try {
                     let validUser = await Users.authenticateToken(token);
                     req.user = validUser;
                     req.token = validUser.token;
                     next();
              }
              catch (e) {
                     console.log("e", e);
                     return res.status(401).json(replyBody.error("Registration_Authorization_Error", "Invalid Token"));
              }
       }
}
