import sys
import json
import pandas as pd
from pathlib import Path

CSV_DIR = Path("./csv")
JSON_DIR = Path("./json")

if __name__ == "__main__":
    name = sys.argv[1]
    c = pd.read_csv(CSV_DIR / f'{name}.csv')
    with open(JSON_DIR / f'{name}.json', 'w', encoding='utf-8') as f:
        json.dump(json.loads(c.to_json(orient="records")), f, indent=2, ensure_ascii=False)
