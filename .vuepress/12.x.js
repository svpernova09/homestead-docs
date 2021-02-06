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
        title: "Usage",
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
        collapsable: true,
        children: [
            '/providers/virtualbox',
            '/providers/vmware',
            '/providers/parallels',
            '/providers/hyperv',
        ],
    },
]

function prefix(prefix, children) {
    return children.map(child => `${prefix}/${child}`)
}
