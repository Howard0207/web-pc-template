// import { Layer } from '_components';
import { useRef, useState, useEffect } from 'react';
import { Dropdown, Menu, Select, Input, List } from 'antd';
import { withRouter, useHistory } from 'react-router-dom';
import * as globalActionCreators from '_store/globalActionCreator';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { clearStorage, toLogin, setLocalCurrentFactory } from '_utils';
import { Layer } from '_components';
import moment from 'moment';
import '_less/main/components/header';

const { Option } = Select;
const { Search } = Input;

function Header(props) {
    const { currentFactory, setCurrentFactory, factoryList, requestUserInfo, requestFactoryList, accountInfo } = props;
    const history = useHistory();
    const layer = useRef();
    const [areaList, setAreaList] = useState([]); // 地区
    const [selectArea, setSelectArea] = useState('全国');
    const [scopeFactoryList, setScopeFactoryList] = useState(factoryList);
    const [searchSopeFactoryList, setSearchScopeFactoryList] = useState(factoryList);
    const [searchText, setSearchText] = useState('');
    /**
     * 用户下拉菜单
     * @param {type: JSON, desc: menuItem信息} param0 { item, key, keyPath, domEvent }
     */
    const handleUserMenuClick = async ({ key }) => {
        if (key === 'logout') {
            clearStorage();
            toLogin();
        }
    };

    /**
     * 创建地区下拉选择array
     * @param {type: Array, desc: 工厂列表数据 } menu [{province: '**', shortname: '**', fullname: '**', ...}]
     */
    const createAreaMenu = (menu) => {
        const areaSet = new Set();
        menu.forEach((item) => areaSet.add(item.province));
        return Array.from(areaSet);
    };

    // account select menu
    const userMenu = (
        <Menu onClick={handleUserMenuClick} className="header__user-menu">
            <Menu.Item key="logout">退出登录</Menu.Item>
        </Menu>
    );

    /**
     * 打开layer
     */
    function layerOpen() {
        layer.current.layerOpen();
    }

    /**
     * 关闭layer
     */
    function layerClose() {
        layer.current.layerClose();
    }

    /**
     * 地区下拉筛选过滤
     * @param {type: Object, desc: 选中的item} selectItem { value: "lucy", key: "lucy", label: "Lucy (101)" }
     */
    const filterCity = (selectItem) => {
        let filterRes = [];
        if (selectItem.value === '全国') {
            filterRes = factoryList;
        } else {
            filterRes = factoryList.filter((item) => selectItem.value === item.province);
        }
        return filterRes;
    };

    /**
     * 搜索筛选过滤
     * @param {type: String, desc: 搜索文本 } value '深圳**公司'
     * @param {type: Array, desc: 筛选source } list [{shortname: '**', fullname: '**', ...}]
     */
    const filterSearch = (value, list) => {
        if (value === '') {
            return list;
        }
        const reg = new RegExp(`${value}`);
        const searchFactoryList = list.filter((item) => reg.test(item.shortname) || reg.test(item.fullname));
        return searchFactoryList;
    };

    /**
     * 地区选择回调
     * @param {type: object, desc: 选项} value { value: "lucy", key: "lucy", label: "Lucy (101)" }
     */
    function handleAreaChange(selectItem) {
        const filterCityRes = filterCity(selectItem);
        const filterScope = filterSearch(searchText, filterCityRes);
        setSelectArea(selectItem.value);
        setScopeFactoryList(filterScope);
        setSearchScopeFactoryList(filterCityRes);
    }

    /**
     * 搜索回调
     * @param {type: String, desc: 搜索文本 } value
     */
    const handleSearch = (value) => {
        let inputValue = '';
        if (typeof value === 'string') {
            inputValue = value;
        } else {
            inputValue = value.target.value;
        }
        const searchFactoryList = filterSearch(inputValue, searchSopeFactoryList);
        setSearchText(inputValue);
        setScopeFactoryList(searchFactoryList);
    };

    /**
     * 工厂切换回调
     * @param {type: Object, desc: 工厂信息} factory
     */
    const selectCurrentFactory = async (factory) => {
        setLocalCurrentFactory(factory); // 将当前工厂存在本地storage中， 供 service 请求使用
        setCurrentFactory(factory); // 将当前工厂存在global store中供各个页面使用
        layerClose();
        history.push('/overview');
    };

    /**
     * didMount
     */
    useEffect(() => {
        // requestFactoryList();
        // requestUserInfo();
    }, []);

    useEffect(() => {
        const createdAreaList = createAreaMenu(factoryList);
        const [curFactory] = factoryList;
        setScopeFactoryList(factoryList);
        setSearchScopeFactoryList(factoryList);
        setAreaList(createdAreaList);
        if (curFactory) {
            setCurrentFactory(curFactory);
        }
    }, [factoryList]);

    return (
        <header className="header">
            <div className="header__company" onClick={layerOpen}>
                <p>{currentFactory.shortname}</p>
                <p>{currentFactory.fullname}</p>
            </div>
            <div className="header__date">{moment(new Date()).format('YYYY-MM-DD')}</div>
            <Dropdown overlay={userMenu} trigger={['click']}>
                <a className="header__account" onClick={(e) => e.preventDefault()}>
                    <img src={accountInfo.head_image_url} alt="" />
                    <p>{accountInfo.nick_name}</p>
                </a>
            </Dropdown>
            <Layer ref={layer} width={650} className="header__layer">
                <header className="header__layer-header">
                    <Select
                        className="layer-header__dropdown"
                        labelInValue
                        defaultValue={{ value: selectArea }}
                        onChange={handleAreaChange}
                        getPopupContainer={(triggerNode) => triggerNode.parentNode}
                    >
                        <Option value="全国" key="全国">
                            全国
                        </Option>
                        {areaList.map((item) => (
                            <Option value={item} key={item}>
                                {item}
                            </Option>
                        ))}
                    </Select>
                    <Search
                        placeholder="请输入用户名称"
                        onSearch={handleSearch}
                        onChange={handleSearch}
                        onPressEnter={handleSearch}
                        enterButton
                        style={{ width: 200 }}
                    />
                </header>
                <List
                    itemLayout="horizontal"
                    dataSource={scopeFactoryList}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                                title={<span>{item.shortname}</span>}
                                description={item.fullname}
                                onClick={() => selectCurrentFactory(item)}
                            />
                        </List.Item>
                    )}
                />
            </Layer>
        </header>
    );
}

const mapStateToProps = (state) => {
    const { global } = state;
    return {
        factoryList: global.factoryList,
        currentFactory: global.currentFactory,
        accountInfo: global.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => ({
    requestFactoryList() {
        dispatch(globalActionCreators.requestFactoryList());
    },
    requestUserInfo() {
        dispatch(globalActionCreators.requestUserInfo());
    },
    setCurrentFactory(curFactory) {
        const action = globalActionCreators.setCurrentFactory(curFactory);
        return dispatch(action);
    },
});

Header.propTypes = {
    accountInfo: PropTypes.object.isRequired,
    factoryList: PropTypes.array.isRequired,
    currentFactory: PropTypes.object.isRequired,
    setCurrentFactory: PropTypes.func.isRequired,
    requestFactoryList: PropTypes.func.isRequired,
    requestUserInfo: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
