## 项目启动步骤

-   Step one: 克隆项目到本地(clone project to local env)

    git clone https://git.soejh.com/***

-   Step two: 进入项目目录(switch to the project catalogue)

    cd electricity-safety

-   Step three: 切换到项目开发分支(checkout the branch to dev)

    git checkout dev

-   Step four: 安装项目依赖(install project dependences)

    yarn install

-   Step five: 启动项目(start the project)

    yarn dev

## 项目目录结构

```

|- _dll_vendors: 动态链接库

|- build： webpack 构建目录

|- dist：打包后文件目录

|- mock: 假数据接口

|- src: 页面相关目录

    |- api: 服务api接口管理目录

    |- components: 公共组件目录

    |- entry：多页面打包入口

    |- less/scss: 样式目录

        |- components: 组件样式

    |- const: 常量目录

    |- pages: 页面管理目录

    |- router: 路由目录

    |- utils: 公共函数方法目录

    |- static: 静态资源目录

        |- imgs：静态图片

        |- icons：存放iconfont

    |- store： 状态管路目录（vuex/Redux）

```

## 采用的插件有

-   mockjs
-   axios
-   echarts
-   antd
-   moment => 日期处理类库，中文文档 http://momentjs.cn/

## 代码规范（请仔细阅读）

http://www.projectspecification.soejh.com/chapter1/
