Experiment to see job counts of laravel and django on linkedin daily

## Dependencies

playwright

## How it works

- Task sheduler runs scraper.py daily
- simple playwright code to load a linkedin url and grab the count
- script will do the commit and push
- on every commit cloudflare pages updates the website

## TO DO

- [x] Add a github like graph to show the trend

- [x] Add images of linkedin for transparency

- [ ] Add all the regions : one data file but multiple html files

## Credits

Countries list by [kalinchernev](https://gist.github.com/kalinchernev/486393efcca01623b18d)
