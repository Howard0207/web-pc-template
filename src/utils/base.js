const { toString } = Object.prototype;

/**
 * 未完成
 */
export const TokenStorage = {
    get() {
        localStorage.getItem('token');
    },
    set(token) {
        localStorage.setItem('token', token);
    },
};

/**
 * 柯里化方法，处理索引位置数据所占百分比
 * @param {type: array[num], desc: 值为数字的数组} valueList
 * @param {type: number, desc: 精度} precision
 * @return {type: func, desc: 返回一个携带索引参数的函数，该方法返回索引位置数据百分比}
 */
export function percentPrecision(valueList, precision) {
    const sum = valueList.reduce((acc, val) => {
        return acc + (isNaN(val) ? 0 : val);
    }, 0);

    const digits = Math.pow(10, precision);
    // 扩大比例
    const votesPerQuota = valueList.map((val) => {
        return ((isNaN(val) ? 0 : val) / sum) * digits * 100;
    });
    const targetSeats = digits * 100;

    const seats = votesPerQuota.map((votes) => {
        return Math.floor(votes);
    });

    let currentSum = seats.reduce((acc, val) => {
        return acc + val;
    }, 0);

    const remainder = votesPerQuota.map((votes, idx) => {
        return votes - seats[idx];
    });

    while (currentSum < targetSeats) {
        let max = Number.NEGATIVE_INFINITY;
        let maxId = null;
        for (let i = 0, len = remainder.length; i < len; ++i) {
            if (remainder[i] > max) {
                max = remainder[i];
                maxId = i;
            }
        }
        ++seats[maxId];
        remainder[maxId] = 0;
        ++currentSum;
    }

    return function calcPercent(idx) {
        if (!valueList[idx]) {
            return 0;
        }
        if (sum === 0) {
            return 0;
        }
        return seats[idx] / digits;
    };
}

/**
 * 订阅发布
 */
export const EventHub = {
    events: {},
    on(event, fn) {
        if (this.events[event]) {
            this.events[event].push(fn);
        } else {
            this.events[event] = [fn];
        }
    },
    emit(event, ...rest) {
        if (this.events[event] !== undefined && Array.isArray(this.events[event])) {
            this.events[event].forEach((fn) => {
                fn(...rest);
            });
        }
    },
    off(event, fn) {
        if (fn === undefined) {
            delete this.events[event];
        } else {
            const idx = this.events[event].indexOf(fn);
            if (idx >= 0) {
                this.events[event].splice(idx, 1);
            }
        }
    },
};

/**
 * 根据传入的数值得到今天，昨天，明天等等天数
 * @param {Number} dayNum 正整数或负整数
 * @return {String} 返回值为 yyyyMMdd 格式：2020-05-20
 * */
export function getYTTdate(dayNum) {
    const day = new Date();
    day.setTime(day.getTime() + 24 * 60 * 60 * 1000 * dayNum);
    let month = day.getMonth() + 1;
    month = month < 10 ? `0${month}` : month;
    const res = `${day.getFullYear()}-${month}-${day.getDate()}`;
    return res;
}

/**
 * 千分位并保留 n 位小数
 * @param { Number } num 数值
 * @param { Number } decimal 需要保留的小数位
 * @return { Float } 浮点数
 * */
export function micrometerLevel(num, decimal) {
    let newNum = num;
    if (newNum === '') return '--';
    if (decimal === 0 || decimal === undefined) {
        return `${newNum}`.replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,');
    }
    if (typeof newNum === 'string') {
        newNum = Number(newNum);
    }
    return newNum.toFixed(decimal).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}

/**
 * 保留 n 位小数
 * @param { Number } num 数值
 * @param { Number } decimal 需要保留的小数位，默认保留两位
 * @param { Number } multiplication 需要相乘的数值
 * @param { String } nodataSymbol 没数据时候的符号
 * @return { Number } 数值
 * */
export function retainDecimal(num, decimal = 2, multiplication, nodataSymbol = '--') {
    let nNum = num;
    if (nNum === '' || nNum === undefined || nNum === null) return nodataSymbol;
    // 乘法处理
    if (multiplication !== undefined) {
        nNum *= multiplication;
    }
    // 保留小数位
    if (decimal) {
        nNum = nNum.toFixed(decimal);
    }
    return nNum;
}

/**
 * 事件绑定方法
 * @param {type: DomElement, desc: 绑定事件的元素 } obj
 * @param {type: Event, desc: 监听的事件} ev
 * @param {type: func, desc: 处理事件的方法} fn
 */
function myAddEvent() {
    if (window.addEventListener) {
        return (obj, ev, fn) => {
            obj.addEventListener(ev, fn, false);
        };
    }
    return (obj, ev, fn) => {
        obj.attachEvent(`on${ev}`, fn);
    };
}

export const addEvent = myAddEvent();

/**
 * 事件解绑
 * @param {type: DomElement, desc: 解绑事件的元素 } obj
 * @param {type: Event, desc: 监听的事件} ev
 * @param {type: func, desc: 处理事件的方法} fn
 */
function myRemoveEvent() {
    if (window.removeEventListener) {
        return (obj, ev, fn) => {
            obj.removeEventListener(ev, fn, false);
        };
    }
    return (obj, ev, fn) => {
        obj.detachEvent(`on${ev}`, fn);
    };
}

export const removeEvent = myRemoveEvent();

/**
 * 动态加载script
 * @param {type: string, desc: script地址} url
 * @param {type: boolean, desc: true->插入到body最后, false->插入到head} injectBody
 */
export const loadScript = (() => {
    const scriptMap = {};
    return (url, injectBody = true) => {
        if (scriptMap[url]) {
            return Promise.resolve(scriptMap[url]);
        }
        return new Promise((resolve, reject) => {
            scriptMap[url] = 'loading';
            const script = document.createElement('script');
            script.onload = () => {
                scriptMap[url] = 'loaded';
                resolve(scriptMap[url]);
            };
            script.onerror = () => {
                scriptMap[url] = null;
                script.remove();
                reject(scriptMap[url]);
            };
            script.src = url;
            if (injectBody) {
                document.body.appendChild(script);
            } else {
                document.head.appendChild(script);
            }
        });
    };
})();

/**
 * 获取location链接上的query参数
 * @param {type: string, desc: search字段} name
 */
export function getQueryString(name) {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
    const r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

/**
 * async 方法错误捕获
 * @param {type: Function, desc: 异步方法 } asyncFunc
 * @param  {type: } data
 */
export const errorCapture = async (asyncFunc, ...data) => {
    try {
        const res = await asyncFunc(...data);
        return [null, res];
    } catch (e) {
        return [e, null];
    }
};

/**
 * 清除storage信息
 * @param {type: Array|| string, desc: 删除指定storage信息或默认storage} list
 */
export function clearStorage(list) {
    let storageList = [
        'zhidianu_token',
        'currentFactory',
        'factoryList',
        'zhidianu_accountInfo',
        'zhidianu_pointList',
        'zhidianu_inlineList',
    ];
    if (typeof list === 'string') {
        storageList = [list];
    } else if (toString.call(list) === '[object Array]') {
        storageList = list;
    }
    storageList.forEach((item) => localStorage.removeItem(item));
}

/**
 * 下载execl 数据
 * @param {type: xlsx , desc: xlsx 组件对象} xlsxObj
 * @param {type: json , desc: 写入excel的json数据 } dataJson
 * @param {type: string , desc: excel文件名 } fileName
 * @example
 *      dataJson = [
 *         { 大标题: null },
 *         { null: '大标题' },
 *         { null: '大标题' },
 *         { null: '大标题' },
 *         { Name: 'name_01', Age: 21, Address: 'address_01' },
 *         { Name: 'name_02', Age: 22, Address: 'address_02' },
 *         { Name: 'name_03', Age: 23, Address: 'address_03' },
 *      ];
 * */
export const downLoadXlsxData = (xlsxObj, dataJson, fileName, sheetNames) => {
    const sheetNameList = sheetNames || ['Sheet1'];
    // const jsonToSheet = xlsxObj.utils.json_to_sheet(dataJson); // 通过工具将json转表对象
    // const keys = Object.keys(jsonToSheet).sort(); // 排序 [需要注意，必须从A1开始]
    // const ref = `${keys[1]}:${keys[keys.length - 1]}`; // 这个是定义一个字符串 也就是表的范围[A1:C5]
    const sheets = {};
    if (sheetNameList.length > 1) {
        sheetNameList.forEach((item, index) => {
            const json = xlsxObj.utils.json_to_sheet(dataJson[index]);
            sheets[item] = { ...json };
        });
    } else {
        const json = xlsxObj.utils.json_to_sheet(dataJson);
        sheets[sheetNameList[0]] = { ...json };
    }
    const workbook = {
        SheetNames: sheetNameList,
        Sheets: sheets,
    };
    xlsxObj.writeFile(workbook, `${fileName}.xls`); // 将数据写入文件
};
