SSH - without password
----------------------

On the host
-----------

Firstly check if id_rsa.pub and id_rsa exists in ~/.ssh. If the file exists skip step 2.

Generate your public/private keys using ssh-keygen

```
ssh-keygen -t rsa
```

Now copy the id_rsa.pub to the .ssh directory of the remote host (for instance to the homefolder via scp/sftp)

On the server
-------------

Append the content of id_rsa.pub to .ssh/authorized_keys2

```
cat id_rsa.pub >> .ssh/authorized_keys2
```

Now you are all set and can ssh without password from the host to the server.
