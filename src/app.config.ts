export default defineAppConfig({
    pages: ['pages/index/index', 'pages/user/index'],
    window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: 'WeChat',
        navigationBarTextStyle: 'black'
    },
    tabBar: {
        custom: true,
        color: '#000000',
        selectedColor: '#DC143C',
        backgroundColor: '#ffffff',
        list: [
            {
                pagePath: 'pages/index/index',
                text: '首页'
            },
            {
                pagePath: 'pages/user/index',
                text: '个人中心'
            }
        ]
    }
})
