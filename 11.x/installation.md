# Installation

[[toc]]

### First Steps

Before launching your Homestead environment, you must install [VirtualBox 6.1](https://www.virtualbox.org/wiki/Downloads), [VMWare](https://www.vmware.com), [Parallels](https://www.parallels.com/products/desktop/) or [Hyper-V](https://docs.microsoft.com/en-us/virtualization/hyper-v-on-windows/quick-start/enable-hyper-v) as well as [Vagrant](https://www.vagrantup.com/downloads.html). All of these software packages provide easy-to-use visual installers for all popular operating systems.

To use the VMware provider, you will need to purchase both VMware Fusion / Workstation and the [VMware Vagrant plug-in](https://www.vagrantup.com/vmware). Though it is not free, VMware can provide faster shared folder performance out of the box.

To use the Parallels provider, you will need to install [Parallels Vagrant plug-in](https://github.com/Parallels/vagrant-parallels). It is free of charge.

Because of [Vagrant limitations](https://www.vagrantup.com/docs/hyperv/limitations.html), the Hyper-V provider ignores all networking settings.

#### Installing The Homestead Vagrant Box

Once VirtualBox / VMware and Vagrant have been installed, you should add the `laravel/homestead` box to your Vagrant installation using the following command in your terminal. It will take a few minutes to download the box, depending on your Internet connection speed:

```bash
vagrant box add laravel/homestead
```

If this command fails, make sure your Vagrant installation is up to date.

:::tip Homestead periodically issues "alpha" / "beta" boxes for testing, which may interfere with the `vagrant box add` command. If you are having issues running `vagrant box add`, you may run the `vagrant up` command and the correct box will be downloaded when Vagrant attempts to start the virtual machine.
:::

#### Installing Homestead

You may install Homestead by cloning the repository onto your host machine. Consider cloning the repository into a `Homestead` folder within your "home" directory, as the Homestead box will serve as the host to all of your Laravel projects:

```bash
git clone https://github.com/laravel/homestead.git ~/Homestead
```

You should check out a tagged version of Homestead since the `master` branch may not always be stable. You can find the latest stable version on the [GitHub Release Page](https://github.com/laravel/homestead/releases). Alternatively, you may checkout the `release` branch which always contains the latest stable release:

```bash
    cd ~/Homestead
    git checkout release
```

Once you have cloned the Homestead repository, run the `bash init.sh` command from the Homestead directory to create the `Homestead.yaml` configuration file. The `Homestead.yaml` file will be placed in the Homestead directory:

```bash
    // Mac / Linux...
    bash init.sh

    // Windows...
    init.bat
```

### Configuring Homestead

#### Setting Your Provider

The `provider` key in your `Homestead.yaml` file indicates which Vagrant provider should be used: `virtualbox`, `vmware_fusion`, `vmware_workstation`, `parallels` or `hyperv`. You may set this to the provider you prefer:

```yaml
provider: virtualbox
```

#### Configuring Shared Folders

The `folders` property of the `Homestead.yaml` file lists all of the folders you wish to share with your Homestead environment. As files within these folders are changed, they will be kept in sync between your local machine and the Homestead environment. You may configure as many shared folders as necessary:

```yaml
folders:
    - map: ~/code/project1
      to: /home/vagrant/project1
```

:::tip Windows users should not use the `~/` path syntax and instead should use the full path to their project, such as `C:\Users\user\Code\project1`.
:::

You should always map individual projects to their own folder mapping instead of mapping your entire `~/code` folder. When you map a folder the virtual machine must keep track of all disk IO for *every* file in the folder. This leads to performance issues if you have a large number of files in a folder.

```yaml
folders:
    - map: ~/code/project1
      to: /home/vagrant/project1

    - map: ~/code/project2
      to: /home/vagrant/project2
```

:::tip You should never mount `.` (the current directory) when using Homestead. This causes Vagrant to not map the current folder to `/vagrant` and will break optional features and cause unexpected results while provisioning.
:::

To enable [NFS](https://www.vagrantup.com/docs/synced-folders/nfs.html), you only need to add a simple flag to your synced folder configuration:

```yaml
folders:
    - map: ~/code/project1
      to: /home/vagrant/project1
      type: "nfs"
```

:::tip When using NFS on Windows, you should consider installing the [vagrant-winnfsd](https://github.com/winnfsd/vagrant-winnfsd) plug-in. This plug-in will maintain the correct user / group permissions for files and directories within the Homestead box.
:::

You may also pass any options supported by Vagrant's [Synced Folders](https://www.vagrantup.com/docs/synced-folders/basic_usage.html) by listing them under the `options` key:

```yaml
folders:
    - map: ~/code/project1
      to: /home/vagrant/project1
      type: "rsync"
      options:
          rsync__args: ["--verbose", "--archive", "--delete", "-zz"]
          rsync__exclude: ["node_modules"]
```

#### Configuring Nginx Sites

Not familiar with Nginx? No problem. The `sites` property allows you to easily map a "domain" to a folder on your Homestead environment. A sample site configuration is included in the `Homestead.yaml` file. Again, you may add as many sites to your Homestead environment as necessary. Homestead can serve as a convenient, virtualized environment for every Laravel project you are working on:

```yaml
sites:
    - map: homestead.test
      to: /home/vagrant/project1/public
```

If you change the `sites` property after provisioning the Homestead box, you should re-run `vagrant reload --provision`  to update the Nginx configuration on the virtual machine.

:::tip Homestead scripts are built to be as idempotent as possible. However, if you are experiencing issues while provisioning you should destroy and rebuild the machine via `vagrant destroy && vagrant up`.
:::

#### Enable / Disable Services

Homestead starts several services by default; however, you may customize which services are enabled or disabled during provisioning. For example, you may enable PostgreSQL and disable MySQL:

```yaml
services:
    - enabled:
        - "postgresql@12-main"
    - disabled:
        - "mysql"
```

The specified services will be started or stopped based on their order in the `enabled` and `disabled` directives.

#### Hostname Resolution

Homestead publishes hostnames over `mDNS` for automatic host resolution. If you set `hostname: homestead` in your `Homestead.yaml` file, the host will be available at `homestead.local`. MacOS, iOS, and Linux desktop distributions include `mDNS` support by default. Windows requires installing [Bonjour Print Services for Windows](https://support.apple.com/kb/DL999?viewlocale=en_US&locale=en_US).

Using automatic hostnames works best for "per project" installations of Homestead. If you host multiple sites on a single Homestead instance, you may add the "domains" for your web sites to the `hosts` file on your machine. The `hosts` file will redirect requests for your Homestead sites into your Homestead machine. On Mac and Linux, this file is located at `/etc/hosts`. On Windows, it is located at `C:\Windows\System32\drivers\etc\hosts`. The lines you add to this file will look like the following:

```text
192.168.10.10  homestead.test
```

Make sure the IP address listed is the one set in your `Homestead.yaml` file. Once you have added the domain to your `hosts` file and launched the Vagrant box you will be able to access the site via your web browser:

```text
http://homestead.test
```

### Launching The Vagrant Box

Once you have edited the `Homestead.yaml` to your liking, run the `vagrant up` command from your Homestead directory. Vagrant will boot the virtual machine and automatically configure your shared folders and Nginx sites.

To destroy the machine, you may use the `vagrant destroy --force` command.

### Per Project Installation

Instead of installing Homestead globally and sharing the same Homestead box across all of your projects, you may instead configure a Homestead instance for each project you manage. Installing Homestead per project may be beneficial if you wish to ship a `Vagrantfile` with your project, allowing others working on the project to `vagrant up`.

To install Homestead directly into your project, require it using Composer:

```bash
    composer require laravel/homestead --dev
```

Once Homestead has been installed, use the `make` command to generate the `Vagrantfile` and `Homestead.yaml` file in your project root. The `make` command will automatically configure the `sites` and `folders` directives in the `Homestead.yaml` file.

Mac / Linux:

```bash
php vendor/bin/homestead make
```
Windows:

```bash
vendor\\bin\\homestead make
```

Next, run the `vagrant up` command in your terminal and access your project at `http://homestead.test` in your browser. Remember, you will still need to add an `/etc/hosts` file entry for `homestead.test` or the domain of your choice if you are not using automatic [hostname resolution](#hostname-resolution).

### Installing Optional Features

Optional software is installed using the "features" setting in your Homestead configuration file. Most features can be enabled or disabled with a boolean value, while some features allow multiple configuration options:

```yaml
features:
    - blackfire:
        server_id: "server_id"
        server_token: "server_value"
        client_id: "client_id"
        client_token: "client_value"
    - cassandra: true
    - chronograf: true
    - couchdb: true
    - crystal: true
    - docker: true
    - elasticsearch:
        version: 7.9.0
    - gearman: true
    - golang: true
    - grafana: true
    - influxdb: true
    - mariadb: true
    - minio: true
    - mongodb: true
    - mysql8: true
    - neo4j: true
    - ohmyzsh: true
    - openresty: true
    - pm2: true
    - python: true
    - rabbitmq: true
    - solr: true
    - webdriver: true
```

#### MariaDB

Enabling MariaDB will remove MySQL and install MariaDB. MariaDB serves as a drop-in replacement for MySQL, so you should still use the `mysql` database driver in your application's database configuration.

#### MongoDB

The default MongoDB installation will set the database username to `homestead` and the corresponding password to `secret`.

#### Elasticsearch

You may specify a supported version of Elasticsearch, which may be a major version or an exact version number (major.minor.patch). The default installation will create a cluster named 'homestead'. You should never give Elasticsearch more than half of the operating system's memory, so make sure your Homestead machine has at least twice the Elasticsearch allocation.

::: tip Check out the [Elasticsearch documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current) to learn how to customize your configuration.
:::

#### Neo4j

The default Neo4j installation will set the database username to `homestead` and corresponding password to `secret`. To access the Neo4j browser, visit `http://homestead.test:7474` via your web browser. The ports `7687` (Bolt), `7474` (HTTP), and `7473` (HTTPS) are ready to serve requests from the Neo4j client.

### Aliases

You may add Bash aliases to your Homestead machine by modifying the `aliases` file within your Homestead directory:

```bash
alias c='clear'
alias ..='cd ..'
```

After you have updated the `aliases` file, you should re-provision the Homestead machine using the `vagrant reload --provision` command. This will ensure that your new aliases are available on the machine.
