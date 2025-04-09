from bs4 import BeautifulSoup
import requests
import re
import json
import sys

def extract_jobs_from_html(html):
    soup = BeautifulSoup(html, "html.parser")
    job_listings = []

    job_cards = soup.select("div.job-search-card")

    for div in job_cards:
        try:
            job = {
                "title": (div.select_one("h3.base-search-card__title") or "").get_text(strip=True),
                "company": (div.select_one("h4.base-search-card__subtitle") or "").get_text(strip=True),
                "location": (div.select_one("span.job-search-card__location") or "").get_text(strip=True),
                "logo": div.select_one("img.artdeco-entity-image")["data-delayed-url"] if div.select_one("img.artdeco-entity-image") else None,
                "link": div.select_one("a.base-card__full-link")["href"] if div.select_one("a.base-card__full-link") else None,
                "posted": (div.select_one("time.job-search-card__listdate") or "").get_text(strip=True),
                "activelyHiring": bool(div.select_one(".job-posting-benefits__text")),
                "easyApply": bool(div.select_one("span.job-search-card__easy-apply-label"))
            }
            job_listings.append(job)
        except Exception as e:
            continue

    return job_listings


if __name__ == "__main__":
    url = sys.argv[1]
    html_content = requests.get(url).text
    with open("linkedin_jobs.html", "w", encoding="utf-8") as file:
        file.write(re.sub(r'\n\s*\n', r'\n', html_content, flags=re.DOTALL))

    jobs = extract_jobs_from_html(html_content)
    print(json.dumps(jobs, indent=2, ensure_ascii=False))
