When you don't want the whole repo you can with "core.sparsecheckout" checkout only part of a repo.

git config core.sparsecheckout true

echo some/dir/ >> .git/info/sparse-checkout

git pull <remote> <branch>

git read-tree -mu HEAD

http://jasonkarns.com/blog/subdirectory-checkouts-with-git-sparse-checkout/

