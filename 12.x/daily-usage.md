# Daily Usage

[[toc]]

<a name="connecting-via-ssh"></a>
### Connecting Via SSH

You can SSH into your virtual machine by executing the `vagrant ssh` terminal command from your Homestead directory.

<a name="adding-additional-sites"></a>
### Adding Additional Sites

Once your Homestead environment is provisioned and running, you may want to add additional Nginx sites for your other Laravel projects. You can run as many Laravel projects as you wish on a single Homestead environment. To add an additional site, add the site to your `Homestead.yaml` file.

```yaml
sites:
    - map: homestead.test
      to: /home/vagrant/project1/public
    - map: another.test
      to: /home/vagrant/project2/public
```

:::tip You should ensure that you have configured a [folder mapping](#configuring-shared-folders) for the project's directory before adding the site.:::

If Vagrant is not automatically managing your "hosts" file, you may need to add the new site to that file as well. On macOS and Linux, this file is located at `/etc/hosts`. On Windows, it is located at `C:\Windows\System32\drivers\etc\hosts`:

```yaml
192.168.10.10  homestead.test
192.168.10.10  another.test
```

Once the site has been added, execute the `vagrant reload --provision` terminal command from your Homestead directory.

<a name="site-types"></a>
#### Site Types

Homestead supports several "types" of sites which allow you to easily run projects that are not based on Laravel. For example, we may easily add a Statamic application to Homestead using the `statamic` site type:

```yaml
sites:
    - map: symfony2.test
      to: /home/vagrant/my-symfony-project/web
      type: "symfony2"
```

The available site types are: `apache`, `apigility`, `expressive`, `laravel` (the default), `proxy`, `silverstripe`, `statamic`, `symfony2`, `symfony4`, and `zf`.

<a name="site-parameters"></a>
#### Site Parameters

You may add additional Nginx `fastcgi_param` values to your site via the `params` site directive. For example, we'll add a `FOO` parameter with a value of `BAR`:

```yaml
sites:
    - map: homestead.test
      to: /home/vagrant/project1/public
      params:
          - key: FOO
            value: BAR
```
<a name="environment-variables"></a>
### Environment Variables

You can define global environment variables by adding them to your `Homestead.yaml` file:

```yaml
variables:
    - key: APP_ENV
      value: local
    - key: FOO
      value: bar
```

After updating the `Homestead.yaml` file, be sure to re-provision the machine by executing the `vagrant reload --provision` command. This will update the PHP-FPM configuration for all of the installed PHP versions and also update the environment for the `vagrant` user.

<a name="ports"></a>
### Ports

By default, the following ports are forwarded to your Homestead environment:

<div class="content-list" markdown="1">
- **SSH:** 2222 &rarr; Forwards To 22
- **ngrok UI:** 4040 &rarr; Forwards To 4040
- **HTTP:** 8000 &rarr; Forwards To 80
- **HTTPS:** 44300 &rarr; Forwards To 443
- **MySQL:** 33060 &rarr; Forwards To 3306
- **PostgreSQL:** 54320 &rarr; Forwards To 5432
- **MongoDB:** 27017 &rarr; Forwards To 27017
- **Mailhog:** 8025 &rarr; Forwards To 8025
- **Minio:** 9600 &rarr; Forwards To 9600
</div>

<a name="forwarding-additional-ports"></a>
#### Forwarding Additional Ports

If you wish, you may forward additional ports to the Vagrant box by defining a `ports` configuration entry within your `Homestead.yaml` file. After updating the `Homestead.yaml` file, be sure to re-provision the machine by executing the `vagrant reload --provision` command:

```yaml
ports:
    - send: 50000
      to: 5000
    - send: 7777
      to: 777
      protocol: udp
```

<a name="php-versions"></a>
### PHP Versions

Homestead 6 introduced support for running multiple versions of PHP on the same virtual machine. You may specify which version of PHP to use for a given site within your `Homestead.yaml` file. The available PHP versions are: "5.6", "7.0", "7.1", "7.2", "7.3", "7.4", and "8.0" (the default):

```yaml
sites:
    - map: homestead.test
      to: /home/vagrant/project1/public
      php: "7.1"
```

In addition, you may use any of the supported PHP versions via the CLI:

```bash
php5.6 artisan list
php7.0 artisan list
php7.1 artisan list
php7.2 artisan list
php7.3 artisan list
php7.4 artisan list
php8.0 artisan list
```

You may change the default version of PHP used by the CLI by issuing the following commands from within your Homestead virtual machine:

```bash
php56
php70
php71
php72
php73
php74
php80
```

<a name="connecting-to-databases"></a>
### Connecting To Databases

A `homestead` database is configured for both MySQL and PostgreSQL out of the box. To connect to your MySQL or PostgreSQL database from your host machine's database client, you should connect to `127.0.0.1` on port `33060` (MySQL) or `54320` (PostgreSQL). The username and password for both databases is `homestead` / `secret`.

> {note} You should only use these non-standard ports when connecting to the databases from your host machine. You will use the default 3306 and 5432 ports in your Laravel application's `database` configuration file since Laravel is running _within_ the virtual machine.

<a name="database-backups"></a>
### Database Backups

Homestead can automatically backup your database when your Homestead virtual machine is destroyed. To utilize this feature, you must be using Vagrant 2.1.0 or greater. Or, if you are using an older version of Vagrant, you must install the `vagrant-triggers` plug-in. To enable automatic database backups, add the following line to your `Homestead.yaml` file:

```yaml
backup: true
```

Once configured, Homestead will export your databases to `mysql_backup` and `postgres_backup` directories when the `vagrant destroy` command is executed. These directories can be found a `.backup` directory in the folder where you installed Homestead or in the root of your project if you are using the [per project installation](#per-project-installation) method.

<a name="configuring-cron-schedules"></a>
### Configuring Cron Schedules

Laravel provides a convenient way to [schedule cron jobs](/docs/{{version}}/scheduling) by scheduling a single `schedule:run` Artisan command to run every minute. The `schedule:run` command will examine the job schedule defined in your `App\Console\Kernel` class to determine which scheduled tasks to run.

If you would like the `schedule:run` command to be run for a Homestead site, you may set the `schedule` option to `true` when defining the site:

```yaml
sites:
    - map: homestead.test
      to: /home/vagrant/project1/public
      schedule: true
```

The cron job for the site will be defined in the `/etc/cron.d` directory of the Homestead virtual machine.

<a name="configuring-mailhog"></a>
### Configuring MailHog

[MailHog](https://github.com/mailhog/MailHog) allows you to intercept your outgoing email and examine it without actually sending the mail to its recipients. To get started, update your application's `.env` file to use the following mail settings:

```ini
MAIL_MAILER=smtp
MAIL_HOST=localhost
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
```

Once Mailhog has been configured, you may access the Mailhog dashboard at `http://localhost:8025`.

### Configuring Minio

[Minio](https://github.com/minio/minio) is an open source object storage server with an Amazon S3 compatible API. To install Minio, update your `Homestead.yaml` file with the following configuration option in the [features](#installing-optional-features) section:

```yaml
minio: true
```

By default, Minio is available on port 9600. You may access the Minio control panel by visiting `http://localhost:9600`. The default access key is `homestead`, while the default secret key is `secretkey`. When accessing Minio, you should always use region `us-east-1`.

In order to use Minio, you will need to adjust the S3 disk configuration in your application's `config/filesystems.php` configuration file. You will need to add the `use_path_style_endpoint` option to the disk configuration as well as change the `url` key to `endpoint`:

```yaml
    's3' => [
        'driver' => 's3',
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION'),
        'bucket' => env('AWS_BUCKET'),
        'endpoint' => env('AWS_URL'),
        'use_path_style_endpoint' => true,
    ]
```

Finally, ensure your `.env` file has the following options:

```ini
AWS_ACCESS_KEY_ID=homestead
AWS_SECRET_ACCESS_KEY=secretkey
AWS_DEFAULT_REGION=us-east-1
AWS_URL=http://localhost:9600
```

To provision Minio powered "S3" buckets, add a `buckets` directive to your `Homestead.yaml` file. After defining your buckets, you should execute the `vagrant reload --provision` command in your terminal:


```yaml
    buckets:
        - name: your-bucket
          policy: public
        - name: your-private-bucket
          policy: none
```

Supported `policy` values include: `none`, `download`, `upload`, and `public`.

<a name="laravel-dusk"></a>
### Laravel Dusk

In order to run [Laravel Dusk](/docs/{{version}}/dusk) tests within Homestead, you should enable the [`webdriver` feature](#installing-optional-features) in your Homestead configuration:

```yaml
features:
    - webdriver: true
```

After enabling the `webdriver` feature, you should execute the `vagrant reload --provision` command in your terminal.

<a name="sharing-your-environment"></a>
### Sharing Your Environment

Sometimes you may wish to share what you're currently working on with coworkers or a client. Vagrant has built-in support for this via the `vagrant share` command; however, this will not work if you have multiple sites configured in your `Homestead.yaml` file.

To solve this problem, Homestead includes its own `share` command. To get started, [SSH into your Homestead virtual machine](#connecting-via-ssh) via `vagrant ssh` and execute the `share homestead.test` command. This command will share the `homestead.test` site from your `Homestead.yaml` configuration file. You may substitute any of your other configured sites for `homestead.test`:

```bash
share homestead.test
```
`
After running the command, you will see an Ngrok screen appear which contains the activity log and the publicly accessible URLs for the shared site. If you would like to specify a custom region, subdomain, or other Ngrok runtime option, you may add them to your `share` command:

```bash
share homestead.test -region=eu -subdomain=laravel
```

:::tip Remember, Vagrant is inherently insecure and you are exposing your virtual machine to the Internet when running the `share` command.
:::

### Web Servers

Homestead uses the Nginx web server by default. However, it can install Apache if `apache` is specified as a site type. While both web servers can be installed at the same time, they cannot both be *running* at the same time. The `flip` shell command is available to ease the process of switching between web servers. The `flip` command automatically determines which web server is running, shuts it off, and then starts the other server. To use this command, SSH into your Homestead machine and run the command in your terminal:

```bash
flip
```

### Mail

Homestead includes the Postfix mail transfer agent, which is listening on port `1025` by default. So, you may instruct your application to use the `smtp` mail driver on `localhost` port `1025`. Then, all sent mail will be handled by Postfix and caught by Mailhog. To view your sent emails, open [http://localhost:8025](http://localhost:8025) in your web browser.
