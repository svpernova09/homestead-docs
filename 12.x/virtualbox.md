# Virtualbox

[[toc]]

[VirtualBox 6.1](https://www.virtualbox.org/wiki/Downloads) is one of the most widely popular Vagrant providers due to in being free of charge to use. Virtualbox is the most stable platform for *many* users.

#### `natdnshostresolver`

By default, Homestead configures the `natdnshostresolver` setting to `on`. This allows Homestead to use your host operating system's DNS settings. If you would like to override this behavior, add the following configuration options to your `Homestead.yaml` file:

```yaml
provider: virtualbox
natdnshostresolver: 'off'
```

#### Symbolic Links On Windows

If symbolic links are not working properly on your Windows machine, you may need to add the following block to your `Vagrantfile`:

```ruby
config.vm.provider "virtualbox" do |v|
    v.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate/v-root", "1"]
end
```
