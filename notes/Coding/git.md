

Force pull
```
git reset --hard origin/master
```

Force Push
```
git push -f
```

### Forced to use https because SSH is blocked?

```
git config --global credential.helper store
```

Stores username and password in ~/.git-credentials 
so that you don't have to provide it every time.

