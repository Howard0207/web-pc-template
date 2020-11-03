/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');
const Mock = require('mockjs');

const router = express.Router();
router.post('/points-list', (req, res) => {
    const data = Mock.mock({
        code: 200,
        msg: 'success',
        data: {
            rows: [
                { name: '1#变压器', point_id: 1 },
                { name: '2#变压器', point_id: 2 },
                { name: '3#变压器', point_id: 3 },
                { name: '4#变压器', point_id: 4 },
                { name: '5#变压器', point_id: 5 },
                { name: '6#变压器', point_id: 6 },
                { name: '7#变压器', point_id: 7 },
                { name: '8#变压器', point_id: 8 },
                { name: '9#变压器', point_id: 9 },
                { name: '10#变压器', point_id: 10 },
            ],
        },
    });
    res.json(data);
});
module.exports = router;
