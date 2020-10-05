module.exports = [
    {
        title: "Getting Started",
        collapsable: false,
        children: [
            'introduction',
            'installation',
            'updating-homestead',
        ],
    },
    {
        title: "Daily Usage",
        collapsable: false,
        children: [
            'daily-usage',
            'debugging-and-profiling',
            'extending-homestead',
            'network-interfaces',
        ],
    },
    {
        title: "Providers",
        collapsable: false,
        children: prefix('providers', [
            'hyperv',
            'parallels',
            'virtualbox',
            'vmware',
        ]),
    }
]

function prefix(prefix, children) {
    return children.map(child => `${prefix}/${child}`)
}
