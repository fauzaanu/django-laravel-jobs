from urls import DJANGO_URL, LARAVEL_URL
from playwright.sync_api import sync_playwright
import re
import datetime
import json
import os
import subprocess

import uuid

def main():
  new_data = {'date': datetime.datetime.now().isoformat(), 'jobs': {'DJANGO_URL': '', 'LARAVEL_URL': ''}, 'imgs': {'DJANGO_URL': '', 'LARAVEL_URL': ''}}
  with sync_playwright() as p:
    for url, key in zip([DJANGO_URL, LARAVEL_URL], ['DJANGO_URL', 'LARAVEL_URL']):
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto(url)
        html_content = page.content()
        match = re.search(r'Past 24 hours \((\d+,?\d*)\)', html_content)
        job_count = int(match.group(1).replace(',', '')) if match else 0
        new_data['jobs'][key] = job_count

        # Take a screenshot and save it to the public/imgs/ directory with a random UUID4 key
        img_key = str(uuid.uuid4())
        page.screenshot(path=f'public/imgs/{img_key}.png')
        new_data['imgs'][key] = img_key

        browser.close()
  with open('public/data.json', 'r+') as f:
    if os.stat('public/data.json').st_size != 0:
        data = json.load(f)
        data.append(new_data)
    else:
        data = [new_data]
    f.seek(0)
    json.dump(data, f)


def commit():
    # Add all changes to the Git staging area
    subprocess.run(["git", "add", "."], check=True)

    # Commit the changes with a message containing the current timestamp
    commit_message = f"Data updated: {datetime.datetime.now().isoformat()}"
    subprocess.run(["git", "commit", "-m", commit_message], check=True)

    # Push the changes to the remote repository
    subprocess.run(["git", "push"], check=True)

if __name__ == '__main__':
  main()
  commit()
