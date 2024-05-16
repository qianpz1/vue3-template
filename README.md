
# Vue3 + TS + Vite

引入postcss-px-to-viewport-8-plugin，适配大小屏，px自动转换rem  
useThemes 主题切换
useLocaleModel 语言切换
useFontSize 计算root font-size

## ENV介绍：  
环境变量-生产、测试  
VITE_APP_ENV=development  
加密KEY-用于localstorage等等存储加密  
VITE_APP_AES_KEY=123456  
TOKEN-网络请求token的请求头key  
VITE_APP_TOKEN_NAME=X-CSRFTOKEN  
TOKEN前缀-可定义前缀，例如：Bearer!1，自动替换!1  
VITE_APP_TOKEN_CONTENT=!1  
路由路径  
VITE_APP_ROOT_ROUTE=/  
路由模式-hash、history  
VITE_APP_ROUTE_MODE=hash  
打包文件名  
VITE_APP_PACKAGE_NAME=dist  
设计图宽度  
VITE_APP_BASE_CLIENT_WIDTH=1920  
设计图基础字体大小  
VITE_APP_BASE_FONT_SIZE=16  
是否使用远程路由  
VITE_APP_REMOTE_ROUTER=false  