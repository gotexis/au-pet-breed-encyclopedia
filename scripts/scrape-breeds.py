#!/usr/bin/env python3
"""Fast scraper: Dog CEO API (breeds + images) + catfact.ninja (cat breeds). No per-breed enrichment."""
import json, urllib.request, os, re

def fetch_json(url):
    req = urllib.request.Request(url, headers={"User-Agent": "PetEncyclopedia/1.0"})
    with urllib.request.urlopen(req, timeout=20) as r:
        return json.loads(r.read())

def slugify(name):
    return re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-')

def main():
    out_dir = os.path.join(os.path.dirname(__file__), "..", "data")
    os.makedirs(out_dir, exist_ok=True)

    # DOGS - get all breeds + one random image each (batch)
    print("Fetching dog breeds...")
    breeds_raw = fetch_json("https://dog.ceo/api/breeds/list/all")["message"]
    
    dogs = []
    for breed, subs in breeds_raw.items():
        entries = [(f"{sub} {breed}", f"{breed}/{sub}") for sub in subs] if subs else [(breed, breed)]
        for display, path in entries:
            name = display.replace("-", " ").title()
            try:
                img = fetch_json(f"https://dog.ceo/api/breed/{path}/images/random")
                image = img.get("message", "")
            except:
                image = ""
            dogs.append({"name": name, "slug": slugify(name), "type": "dog", "image_url": image})
    
    with open(os.path.join(out_dir, "dogs.json"), "w") as f:
        json.dump(dogs, f, indent=2)
    print(f"Saved {len(dogs)} dogs")

    # CATS
    print("Fetching cat breeds...")
    cats = []
    page = 1
    while True:
        data = fetch_json(f"https://catfact.ninja/breeds?limit=100&page={page}")
        for b in data.get("data", []):
            cats.append({
                "name": b.get("breed", ""),
                "slug": slugify(b.get("breed", "")),
                "type": "cat",
                "country": b.get("country", ""),
                "origin": b.get("origin", ""),
                "coat": b.get("coat", ""),
                "pattern": b.get("pattern", ""),
                "image_url": "",
            })
        if not data.get("next_page_url"):
            break
        page += 1
    
    with open(os.path.join(out_dir, "cats.json"), "w") as f:
        json.dump(cats, f, indent=2)
    print(f"Saved {len(cats)} cats")
    print(f"Total: {len(dogs)} dogs + {len(cats)} cats")

if __name__ == "__main__":
    main()
