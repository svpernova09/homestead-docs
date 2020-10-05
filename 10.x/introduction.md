# Introduction

[[toc]]

Laravel strives to make the entire PHP development experience delightful, including your local development environment. [Vagrant](https://www.vagrantup.com) provides a simple, elegant way to manage and provision Virtual Machines.

Laravel Homestead is an official, pre-packaged Vagrant box that provides you a wonderful development environment without requiring you to install PHP, a web server, and any other server software on your local machine. No more worrying about messing up your operating system! Vagrant boxes are completely disposable. If something goes wrong, you can destroy and re-create the box in minutes!

Homestead runs on any Windows, Mac, or Linux system, and includes Nginx, PHP, MySQL, PostgreSQL, Redis, Memcached, Node, and all of the other goodies you need to develop amazing Laravel applications.

:::tip If you are using Windows, you may need to enable hardware virtualization (VT-x). It can usually be enabled via your BIOS.
:::

### Included Software

 Name | Name 
------------ | -------------
Git | Composer
PHP 7.4 | Node (With Yarn, Bower, Grunt, and Gulp)
PHP 7.3 | Redis
PHP 7.2 | Memcached
PHP 7.1 | Beanstalkd
PHP 7.0 | Mailhog
PHP 5.6 | avahi
Nginx | ngrok
MySQL | Xdebug
Composer| XHProf / Tideways / XHGui
PostgreSQL (9.6, 10, 11, 12) | wp-cli
Sqlite3 | 


### Optional Software

 Name | Name 
------------ | -------------
Apache | MinIO
Blackfire | MongoDB
Cassandra | MySQL 8
Chronograf | Neo4j
CouchDB | Oh My Zsh
Crystal & Lucky Framework | Open Resty
Docker | PM2
Elasticsearch | Python
Gearman | RabbitMQ
Go | Solr
Grafana | Webdriver & Laravel Dusk Utilities
InfluxDB | MariaDB
