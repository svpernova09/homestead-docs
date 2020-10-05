# Extending Homestead

[[toc]]

You may extend Homestead using the `after.sh` script in the root of your Homestead directory. Within this file, you may add any shell commands that are necessary to properly configure and customize your virtual machine.

When customizing Homestead, Ubuntu may ask you if you would like to keep a package's original configuration or overwrite it with a new configuration file. To avoid this, you should use the following command when installing packages to avoid overwriting any configuration previously written by Homestead:

```bash
sudo apt-get -y \
    -o Dpkg::Options::="--force-confdef" \
    -o Dpkg::Options::="--force-confold" \
    install your-package
```

### User Customizations

When using Homestead in a team setting, you may want to tweak Homestead to better fit your personal development style. You may create a `user-customizations.sh` file in the root of your Homestead directory (The same directory containing your `Homestead.yaml`). Within this file, you may make any customization you would like; however, the `user-customizations.sh` should not be version controlled.
