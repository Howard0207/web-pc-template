import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const AvatarDropDown = (
    <Menu>
        <Menu.Item key="user-center">
            <Link to="/detail/user-center">
                <i className="iconfont icon-person"></i>
                <span className="link">个人中心</span>
            </Link>
        </Menu.Item>
        <Menu.Item key="logout">
            <>
                <i className="iconfont icon-power-off"></i>
                <span className="link">退出</span>
            </>
        </Menu.Item>
    </Menu>
);

export default AvatarDropDown;
