message="Auto commit $(date)"

git add .
git status
git commit -m "$message"
git push origin master

#rm -rf $path

printf '\n\e[32mAll done!\n'
