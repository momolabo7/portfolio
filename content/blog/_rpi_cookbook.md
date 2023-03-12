---
title: "My Raspberry PI Cookbook"
date: 2023-03-12T12:00:00+08:00
authors:
  - Gerald Wong
tags:
  - Programming
---

I figured that I might as well save a Raspberry PI cookbook somewhere.

<!-- more -->

Note that these are for Raspberry PI OS.
Some of these will work on other Linux distributions (especially Debian since Raspbian derives from it). 
te that these are for Raspberry PI OS.


But you know, Linux being linux and distributions being distributions, not all of them will work for everything. 
Since I only use Raspberry PI right now, I'll just stick to the commands being for the Raspberry PI.

I will update this cookbook every now and then when I play with my PI.

# User

Check what groups the current user is under

```sh
groups
```

# Disk space

Displaying disk space in human-readable format
```sh
df -h
```

# Processes

Displaying processes

```sh
ps
```

Monitor processes (press 'q' to quit)

```sh
htop
```

# File

Monitoring a file
```sh
# Monitors the last N lines of a file
# -n is optional
tail -n [N]  -f [FILENAME]
```

Printing a file
```sh
cat [FILENAME]
```

Printing a in reverse (line-wise)
```sh
tac [FILENAME]
```

Grepping a file
```sh
grep [OPTIONS (optional)] [PATTERN] [FILES]

# for example, this greps all "hello" in the files main.c and main.h
grep hello main.c main.h
```

Grepping a file with regex
```sh
grep -E [PATTERN] [FILES]
```

# Network

Displays active network connections and their corresponding processes

```sh
sudo netstat -nltp
```

# Enable VNC and SSH

Open the terminal on the RPI, then:

```sh
sudo raspi-config
```

Select [Interfacing Options] > VNC > Yes > Ok

# Enable SSH with public/private key authentication

Let's define device R as the RPI and device C as the computer you want to connect from.
We assume that C has already generated its public/private key pair.

Open the terminal on R, then:

```sh
sudo raspi-config
```

Select [Interfacing Options] > SSH > Yes > Ok

Then, make the following directory:

```sh
install -d -m 700 ~/.ssh
```

Open your favourite text editor (e.g. nano, vim, nvim) on `~/.ssh/authorized_keys`. I like vim so:

```sh
sudo vim ~/.ssh/authorized_keys
```

Then somehow, someway, copy paste the public key from device C into that file and save.

Then, make sure that the permissions of that file is set correctly:

```sh
sudo chmod 644 ~/.ssh/authorized_keys
```

Finally, we have to disable password authentication.
Open the following file:

```sh
sudo vim /etc/ssh/sshd_config
```

Add the following line:

```sh
PasswordAuthentication no
```

For any errors related to this, the log is avaliable at this file:

```sh
/var/log/auth.log
```

NOTE: You can, of course, use `ssh-copy-id` command from device C to setup the RSA authentication on device R. 
It basically does the steps related to placing device C's public key into device R's `authorized_keys` file.
That assumes that you DO have `ssh-copy-id` available in device C.

# Docker 

## Installation

Run the crazy script that will setup Docker.

```sh
curl -sSL https://get.docker.com | sh
```

Any user that requires Docker will need to be added to the 'docker' group. 
Let's say my username is 'momo', I will then do the following:

```sh
sudo usermod -aG docker momo
```

Log out and log in again for the changes to take effect. 
After you log in, enter the command below display the list of groups you are under. 

```sh
groups
```

Check that 'docker' is in the list displayed. 

To test that Docker is running, do the following:

```sh
docker run hello-world
```

You should see text displayed as follows:
```txt
Hello from Docker!
This message shows that your installation appears to be working correctly.
```

## Useful commands

Clean up any unused resources (including images)
```sh
docker system prune -a
```

List all containers
```sh
docker ps -a
```

Remove containers
```sh
docker rm [CONTAINER ID OR NAME...]

# Example: removing all containers
docker rm ($docker ps -a -q)
```

List all images
```sh
docker images -a
```

Remove images.
```sh
docker rmi [Images...]

# Example: removing ALL images
docker rmi $(docker images -a -q)
```

Stop container.
```sh
docker stop [CONTAINER ID OR NAME]

# Example: stops all containers
docker stop ($docker ps -a -q)
```

Compose: setups up a container and runs it.
Docker Compose needs a YML file to run.

```sh
docker compose -f given_yml.yml up -d 
```



# SAMBA 

This is mostly used for file sharing between computers (and to a certain extent; backup).

TODO


