import React, { useEffect, useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { useLocation } from 'react-router';
import { Menu } from 'antd';
import { defaultMenu } from '_const';

const { SubMenu } = Menu;

function SiderMenu() {
    const [menu] = useState(defaultMenu);
    const location = useLocation();
    const history = useHistory();
    const { pathname } = location;

    const getMenu = (menuList) =>
        menuList.map((item) => {
            if (item.child.length > 0) {
                return (
                    <SubMenu key={item.path} title={item.name} className={item.className}>
                        {getMenu(item.child)}
                    </SubMenu>
                );
            }
            return (
                <Menu.Item key={item.path} icon={<i className={item.className}></i>}>
                    <span>{item.name}</span>
                </Menu.Item>
            );
        });

    const handleMenuClick = ({ key }) => {
        history.push(key);
    };

    useEffect(() => {}, []);
    return (
        <Menu theme="light" onClick={handleMenuClick} selectedKeys={[pathname]} mode="inline" className="main__menu">
            {getMenu(menu)}
        </Menu>
    );
}
SiderMenu.propTypes = {};
export default withRouter(SiderMenu);
