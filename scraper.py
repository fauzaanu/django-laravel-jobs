from urls import DJANGO_URL, LARAVEL_URL
from playwright.sync_api import sync_playwright
import re
import datetime
import json
import os
import subprocess
import uuid

REGIONS = ['Asia', 'Europe', 'North America', 'South America', 'Africa', 'The Caribbean', 'Central America', 'Oceania', 'Worldwide']

def main():

    with sync_playwright() as p:
        for region in REGIONS:
            # replace space with "-"
            region_key = region.replace(' ', '-')
            new_data = {'region': region_key, 'date': datetime.datetime.now().isoformat(), 'jobs': {}, 'imgs': {}}

            for url, key in zip([DJANGO_URL, LARAVEL_URL], ['DJANGO_URL', 'LARAVEL_URL']):
                target_url = url.replace('location=Worldwide', f'location={region}')

                browser = p.chromium.launch()
                page = browser.new_page()
                page.goto(target_url)

                html_content = page.content()
                match = re.search(r'Past 24 hours ((\d+,?\d*))', html_content)
                job_count = int(match.group(1).replace(',', '')) if match else 0
                new_data['jobs'][key] = job_count

                img_key = str(uuid.uuid4())
                page.screenshot(path=f'public/imgs/{img_key}.png')
                new_data['imgs'][key] = img_key

                browser.close()

            with open('public/data.json', 'r') as f:
                if os.stat('public/data.json').st_size != 0:
                    data = json.load(f)
                else:
                    data = []

            data.append(new_data)

            with open('public/data.json', 'w') as f:
                json.dump(data, f)


def commit():
    subprocess.run(["git", "add", "."], check=True)
    commit_message = f"Data updated: {datetime.datetime.now().isoformat()}"
    subprocess.run(["git", "commit", "-m", commit_message], check=True)
    subprocess.run(["git", "push"], check=True)


if __name__ == '__main__':
    main()
    commit()
