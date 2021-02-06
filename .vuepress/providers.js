module.exports = [
    {
        title: "Providers",
        collapsable: false,
        children: prefix('providers', [
            'virtualbox',
            'vmware',
            'parallels',
        ]),
    }
]

function prefix(prefix, children) {
    return children.map(child => `${prefix}/${child}`)
}
