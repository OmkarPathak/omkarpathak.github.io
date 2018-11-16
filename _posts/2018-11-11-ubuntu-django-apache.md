---
layout: post
title: Deploying Django applications using Apache 2.4 and Ubuntu 
comments: true
description: A detailed guide for deploying applications using apache 2.2/2,4 and ubuntu
keywords: django, omkar django, omkar pathak django, ubuntu, django apache ubuntu, apache ubuntu, python, django python, apache 2.4
image: /public/img/blog-images/linux.jpg
tags: [django, python, web, apache]
---

After refering hundreds of tutorials and guides, I have hosted multiple django websites using Nginx and Apache till date. I faced problems hosting each time with new errors emerging each time. So I thought to write this blog post so that users and developers like me can find a go-to solution (a template kind of thing) to host django applications over Apache 2.4 and Ubuntu.

# Prerequisites

This guide assumes that you have a running **Ubuntu 16.04** or **Ubuntu 18.04** instance and configured with `sudo` access. I strongly recommend to use this guide to serve django application over apache in your local network first and then in production.

We will be installing Django application in a Python virtual environment. This will allow us to install django application specific packages without hampering your global python interpreter. 

Let's get started.

# Installing required packages

First and foremost, we will install appropriate packages required for installing Apache and other libs.

First update your Ubuntu's package indexes by following command:

```
sudo apt-get update
```

If you are using Python2 then execute:

```
sudo apt-get install python-pip apache2 libapache2-mod-wsgi
```

If you are using Python3:

```
sudo apt-get install python3-pip apache2 libapache2-mod-wsgi-py3
```

# Creating a Virtual Environment for our Django Application

We can install virtual environment using the `pip`

```
sudo pip install virtualenv
```

This will install the `virtualenv` which we'll use to create virtual environment for our project. Now, we can create our django application. We will create a directory to install our virtual environment and all django related packages. I strongly recommend to create our project in `/var/www/html/` directory as Apache by default looks into this path to search for sites. Also, you will not get any permission issues related to Apache.

```
cd /var/www/html/
mkdir project/
cd project/
```

Now, we will create a virtual environment in our `projects` directory

```
virtualenv venv
```

This will create a directory called `venv` inside `projects` directory. Now, navigate inside our **venv** directory and then activate our virtual environment:

```
cd venv/
source bin/activate
```

Our prompt should change to indicate that you are now operating within a Python virtual environment. It will look something like this: `(venv)user@host:projects/$`

# Creating our Django Application

We are already in our `projects/venv/` directory with our virtual environment activated. Now, we can create our django project:

```
django-admin startproject mysite
```

I am not going into Django details and settings. We will just create a simple django projects and will not create any static file settings in `settings.py` but we will see how to serve static files and media files over apache.

To complete our project setup, now fire up following commands to complete django project creation:

```
python manage.py migrate
python manage.py runserver
```

Visit http://localhost:8000/ and see if everything is working fine.
If everything works fine, we are ready to go ahead and serve our app over Apache.

# Serving our Django app over Apache

Now that our Django app is working, we will now configure Apache to serve our Django app.
Apache and Django integration is done using WSGI format and Django expects to use `mod_wsgi` module.

To configure apache, edit the default configuration file:

```
sudo nano /etc/apache2/sites-available/000-default.conf
```

First, let's start by granting access to our wsgi.py files located at `/var/www/html/projects/venv/mysite/mysite/wsgi.py`

```
<VirtualHost *:80>
    . . .

    <Directory /var/www/html/projects/venv/mysite/mysite>
        <Files wsgi.py>
            Require all granted
        </Files>
    </Directory>

    . . .
</VirtualHost>
```

Next, we need to configure WSGIDaemonProcess directive. For this add the following lines:

```
<VirtualHost *:80>
    . . .

    <Directory /var/www/html/projects/venv/mysite/mysite>
        <Files wsgi.py>
            Require all granted
        </Files>
    </Directory>

    WSGIDaemonProcess mysite python-path=/var/www/html/projects/venv/mysite python-home=/var/www/html/projects/venv
    WSGIProcessGroup mysite
    WSGIScriptAlias / /var/www/html/projects/venv/mysite/mysite/wsgi.py
    . . .
</VirtualHost>
```

Now, we need to tell apache to serve static files and media files

```
<VirtualHost *:80>
    . . .

    Alias /static /var/www/html/projects/venv/mysite/static
    <Directory /var/www/html/projects/venv/mysite/static>
        Require all granted
    </Directory>

    Alias /media /var/www/html/projects/venv/mysite/media
    <Directory /var/www/html/projects/venv/mysite/media>
        Require all granted
    </Directory>

    . . .
</VirtualHost>
```

So, our overall configuration file should look like:

```bash
<VirtualHost *:80>
    . . .

    <Directory /var/www/html/projects/venv/mysite/mysite>
        <Files wsgi.py>
            Require all granted
        </Files>
    </Directory>

    WSGIDaemonProcess mysite python-path=/var/www/html/projects/venv/mysite python-home=/var/www/html/projects/venv
    WSGIProcessGroup mysite
    WSGIScriptAlias / /var/www/html/projects/venv/mysite/mysite/wsgi.py

    Alias /static /var/www/html/projects/venv/mysite/static
    <Directory /var/www/html/projects/venv/mysite/static>
        Require all granted
    </Directory>

    Alias /media /var/www/html/projects/venv/mysite/media
    <Directory /var/www/html/projects/venv/mysite/media>
        Require all granted
    </Directory>
    . . .
</VirtualHost>
```

**Few things to take a note here**: 
- In WSGIDaemonProcess **mysite** and WSGIProcessGroup **mysite**, here `mysite` is the name of the process group to which Apache will refer while serving our Django application. Hence, these both direcives should have exactly same value.

- `python-path` directive should point to **parent directory of Django Application** 

- `python-home` should point to **virtual environment directory**

- WSGIScriptAlias tells apache to server our `wsgi.py` file when someone tries to access the root `/` of our website

Save the file and then close the file.

# Running our Django App over Apache

After completing all the above steps, now we need to restart the apache2 service:

```
sudo service apache2 restart
```

Now, visit http://localhost and you should see your django app running.

# If you run into permission issue

Above configuration steps should work fine, but for some reason you ran into some permission issues, or if you get something like `Forbidden You don't have permission to access / on this server.` then you can perform these steps:

We need to explicitly give permissions to our db.sqlite3 file

```
chmod 664 /var/www/html/projects/venv/mysite/db.sqlite3
```

We also need to change the group permission for the same

```
sudo chown :www-data /var/www/html/projects/venv/mysite/db.sqlite3
```

In order to write to the file, we also need to give the Apache group ownership over the database's parent directory:

```
sudo chown :www-data /var/www/html/projects/venv/mysite
```

Lastly, restart your apache service

```
sudo service apache2 restart
```

And you are ready to go!

Let me know if you face any problems, so that I can update the guide accordingly. Comments, suggestions are welcome :)
