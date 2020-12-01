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

router.get('/user-info', (req, res) => {
    res.json({
        code: 200,
        data: {
            head_image_url:
                '//thirdwx.qlogo.cn/mmopen/aSMOcxjYiau9W9d1oKYnATm4g6ibExpemkm1lZYCunxx3OzPLuTg418Q5wunhGovBGpsMeKWjfQm8bvoz77sRWLqt4B3sT8QMX/132',
            nick_name: '风里ゝ陪着迩',
            real_name: '熊国宝',
            unit: '清科优能',
            user_id: 88,
        },
        srv_time: 'xxxx.xx.xx XX:XX:XX',
    });
});

router.get('/product-auth', (req, res) => {
    const factoryList = [
        {
            cid: 32,
            shortname: '大地水泥',
            fullname: '茂名市大地水泥有限公司',
            industry: '水泥建材',
            province: '广东省',
            ext_modules: [],
        },
        {
            cid: 34,
            shortname: '广东演示工厂1',
            fullname: '广东演示工厂1有限公司',
            industry: '玻璃陶瓷',
            province: '广东省',
            ext_modules: [],
            logo_url: 'https://www.elecsafe.soejh.com/image/yudaxinneng.png',
        },
        {
            cid: 45,
            shortname: '德鑫矿业',
            fullname: '承德县德鑫矿业有限公司',
            industry: '煤矿采选',
            province: '河北省',
            ext_modules: [],
            logo_url: 'https://www.elecsafe.soejh.com/image/huayushoudian.png',
        },
        {
            cid: 59,
            shortname: '南昌科技园',
            fullname: '江西南昌科技园',
            industry: '其他行业',
            province: '江西省',
            ext_modules: [],
        },
    ];
    res.json({
        code: 200,
        data: factoryList,
        srv_time: 'xxxx.xx.xx XX:XX:XX',
    });
});
module.exports = router;
