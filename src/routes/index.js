const express = require('express')
const router = express.Router()

router.use('/auth', require('./controllers/auth'))
router.use('/depit', require('./controllers/depits'))

module.exports = router