const express = require('express');
const router = express.Router();


router.get('/api', (req, res) => {
    data = {
        message: "This is an api for processing payments."
    }
    res.json(data);
})

router.post('/api/pay', (req, res) => {
    data = {
        message: "Payment successfull"
    }
    res.json(data);
})

module.exports = router