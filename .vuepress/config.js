module.exports = {
    title: "Laravel Homestead",
    description: "Laravel Homestead is an official, pre-packaged Vagrant box that provides you a wonderful development environment without requiring you to install PHP, a web server, and any other server software on your local machine",
    base: '/',

    head: [
        [
            'link',
            {
                href:
                    'https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,800,800i,900,900i',
                rel: 'stylesheet',
                type: 'text/css',
            },
        ],
    ],

    themeConfig: {
        logo: '/assets/img/logo.svg',
        displayAllHeaders: true,
        activeHeaderLinks: false,
        searchPlaceholder: 'Press / to search',
        lastUpdated: false, // string | boolean
        sidebarDepth: 2,

        repo: 'laravel/homestead',

        docsRepo: 'svpernova09/homestead-docs',
        editLinks: true,
        editLinkText: 'Help us improve this page!',

        nav: [
            { text: 'Home', link: '/', target: '_self' },
            {
                text: "Version",
                link: "/",
                items: [{ text: "11.x", link: "/11.x/" }, { text: "10.x", link: "/10.x/" }]
            }
        ],

        sidebar: {
            '/10.x/': require('./10.x'),
            '/11.x/': require('./11.x'),
            '/providers/': require('./providers'),
        },
    },
}
