// build your `/api/projects` router here
const router = require('express').Router()

router.use('*', (req, res) => {
    res.json({Api: 'up'})
})

router.use((err, req, res, next) => { //eslint-disable-line
    res.status(500).json({
        customMessage: 'somthing went wrong inside the project router',
        message: err.message,
        stack: err.stack
    })
})

module.exports = router