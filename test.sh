REPO=$RANDOM
REPOPATH="/tmp/$REPO"

mkdir $REPOPATH
pushd $REPOPATH
git init
echo 'foo' > foo.txt
git add foo.txt && git commit -m 'foo'
git push http://localhost:3000/$REPO.git master
echo 'bar' >> foo.txt
git add foo.txt && git commit -m 'bar'
git tag 0.0.1
git push --tags http://localhost:3000/$REPO.git
popd
rm -Rf $REPOPATH
