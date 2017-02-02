# publi.sh
git checkout site
git merge master
rm -rf _site/
bundle exec jekyll build --baseurl /cuentas-anuales
git add --all
git commit -m "`date`"
git push origin site
git subtree push --prefix  _site/ origin gh-pages