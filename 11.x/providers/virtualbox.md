# Virtualbox

[[toc]]

[https://virtualbox.org](https://virtualbox.org)

#### `natdnshostresolver`

By default, Homestead configures the `natdnshostresolver` setting to `on`. This allows Homestead to use your host operating system's DNS settings. If you would like to override this behavior, add the following lines to your `Homestead.yaml` file:

    provider: virtualbox
    natdnshostresolver: 'off'