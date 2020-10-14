module.exports= {
    title: 'PageLifecycle.js',
    description: "PageLifecycle.js 是一个轻量化的 JavaScript 库（gzip后 < 1Kb），它让开发人员能够轻松观察页面生命周期API（Page Lifecycle API）状态的变化而无需担心浏览器的限制。",
    base: "/pagelifecycle_docs_zh_cn/",
    markdown: {
        lineNumbers: true,
        anchor: {
            permalink: false
        }
    },
    themeConfig: {
        activeHeaderLinks: true,
        displayAllHeaders: true,
        logo: "/images/logo.png",
        nav: [
			{
                text: "大笑文档",
                link: "http://www.febeacon.com"
            },
            {
                text: "文档首页",
                link: "/"
            }
        ],
        sidebar: [
            {
                title: '文档',
                path: '/routes/',
                sidebarDepth: 2
            }
        ]
    },
    head: [
        ["link", {
            rel: "icon", href: "/images/favicon.ico"
        }]
    ]
}