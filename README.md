# django-laravel-jobs
experiment to see job counts of laravel and django on linkedin daily

## How its made
1. playwright script to scrape a linkedin search for laravel developer and django developer
2. grabs the count and updates a data.json file
3. static html file with js updates an html table
4. everytime the script is run a commit + push to github is done
5. on every commit through cloudflare pages the website updates

## TO DO
TBA
