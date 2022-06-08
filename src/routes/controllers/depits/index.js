const express = require('express')
const router = express.Router()

router.use('/create', require('./createDepit'))
router.use('/getAll', require('./getAllDepits'))

module.exports = router;