# sgm-bs

> A Vue.js project


## 目录结构

```bash
├── /build/             # webapck相关配置
├── /dist/              # 项目输出目录
├── /src/               # 项目源码目录
│ ├── /components/      # UI组件及UI相关方法
│ ├── /router/          # 路由
│ ├── /assets/          # 资源文件
│ ├── /store/           # Vuex数据流
│ │ ├── /camera/        # three必备之一 相机
│ │ ├── /controls/      # 控制器，与人交互的工具，拖拽，点击什么的
│ │ ├── /helpers/       # 帮助开发three的工具
│ │ ├── /loaders/       # 外部模型加载器
│ │ ├── /renderer/      # three必备之一渲染器
│ │ ├── /scene/         # three必备之一场景
│ │ ├── /scenes/        # 所有的场景
│ │ │ └── /car/         # 汽车模型
│ │ └── index.js        # three.js入口文件
│ ├── /utils/           # 工具函数
│ ├── /views/           # 页面
│ ├── main.jsx          # 入口
│ ├── AppConfig.js      # App公共配置信息
│ └── index.js          # 项目入口文件
├── /static/            # 静态资源
└── package.json        # 项目信息
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```


##其他注意事项
3dmax导入catia时 Convert to Mesh 设为off ，不然模型和原有的会大出很多倍