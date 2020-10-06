# Virtualbox

[[toc]]

[VirtualBox 6.1](https://www.virtualbox.org/wiki/Downloads) is one of the most widely popular Vagrant providers due to in being free of charge to use. Virtualbox is the most stable platform for *many* users.

#### `natdnshostresolver`

By default, Homestead configures the `natdnshostresolver` setting to `on`. This allows Homestead to use your host operating system's DNS settings. If you would like to override this behavior, add the following lines to your `Homestead.yaml` file:

    provider: virtualbox
    natdnshostresolver: 'off'