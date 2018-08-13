
## SSH without password

### Generate key on the client

Generate a new ssh key

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

### Add key to the server

Copy your public key to the servers .ssh/authorized_keys

```bash
ssh-copy-id -i ~/.ssh/id_rsa.pub username@remote-server.org
```

Or append the content of id_rsa.pub to .ssh/authorized_keys "manually"

```bash
cat ~/.ssh/id_rsa.pub | ssh <user>@<hostname> 'cat >> .ssh/authorized_keys'

```

Now you are all set and can ssh without password from the host to the server.
If you want to use a different key name than the default id_rsa, read on.

#### Using different/multiple ssh-keys in complex ways

Add your SSH private key to ssh-agent. 

```bash
eval "$(ssh-agent -s)"
```

```bash
ssh-add ~/.ssh/private-key-filename
```

To retain these settings you need to save them to ~/.ssh/config.

Example ~/.ssh/config:

```bash
# GitLab.com server
Host gitlab.com
RSAAuthentication yes
IdentityFile ~/.ssh/config/private-key-filename
User tobias.ericsson

# Private GitLab server
Host gitlab.company.com
RSAAuthentication yes
IdentityFile ~/.ssh/config/another-private-key-filename
StrictHostKeyChecking no
ProxyCommand sshpass -p <password> ssh -v -o PubkeyAuthentication=no -o PreferredAuthentications=password -o StrictHostKeyChecking=no -o PasswordAuthentication=yes -W %h:%p 10.17.67.5

# Gateway / Jumpbox
host 10.65.102.*
ControlMaster auto
ControlPath ~/.ssh_control/%r@%h:%p
ControlPersist yes

# Gateway / Jumbbox 2   
Host 10.205.26.* 
ProxyCommand ssh -q 10.65.102.20 -t $(h=%h; echo "nc ${h} %p")
User tobias.ericsson
  
```


## SSH Port forwarding

-L Specifies that the given port on the local (client) host is to be forwarded to the given host and port on the remote side. 

```bash
ssh -L 9200:localhost:9200 user@server
```

## SSH X11 display/screen forwarding

```bash
ssh -X user@server

```

#### Troubleshooting

To get X11 forwarding working over ssh, you'll need 3 things in place.

* Your client must be set up to forward X11.
* Your server must be set up to allow X11 forwarding.
* Your server must be able to set up X11 authentication.

```
echo $DISPLAY
localhost:10.0
```

On the server your /etc/ssh/sshd_config file should have these lines:

```
X11Forwarding yes
X11DisplayOffset 10
```

On the client side your ~/.ssh/config file should have these lines:

```
Host *
  ForwardAgent yes
  ForwardX11 yes
```

