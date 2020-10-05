# Updating Homestead

[[toc]]

Before you begin updating Homestead ensure you have removed your current virtual machine by running the following command in your Homestead directory:

```bash
vagrant destroy
```

Next, you need to update the Homestead source code. If you cloned the repository you can run the following commands at the location you originally cloned the repository:

```bash
git fetch
git pull origin release
```

These commands pull the latest Homestead code from the GitHub repository, fetches the latest tags, and then checks out the latest tagged release. You can find the latest stable release version on the [GitHub releases page](https://github.com/laravel/homestead/releases).

If you have installed Homestead via your project's `composer.json` file, you should ensure your `composer.json` file contains `"laravel/homestead": "^11"` and update your dependencies:

```bash
composer update
```

Then, you should update the Vagrant box using the `vagrant box update` command:

```bash
vagrant box update
```

Next, you should run the `bash init.sh` command from the Homestead directory in order to update some additional configuration files. You will be asked whether you wish to overwrite your existing `Homestead.yaml`, `after.sh`, and `aliases` files:

```bash
    // Mac / Linux...
    bash init.sh

    // Windows...
    init.bat
```

Finally, you will need to regenerate your Homestead box to utilize the latest Vagrant installation:

```bash
vagrant up
```
