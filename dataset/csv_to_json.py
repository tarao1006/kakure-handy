import sys
import json
import shutil
import pandas as pd
from pathlib import Path

CSV_DIR = Path("./csv")
JSON_DIR = Path("./json")
FRONTEND_DIR = Path("../frontend/dataset")

if __name__ == "__main__":
    name = sys.argv[1]
    csv_file = CSV_DIR / f'{name}.csv'
    json_file = JSON_DIR / f'{name}.json'
    c = pd.read_csv(csv_file)
    with open(json_file, 'w', encoding='utf-8') as f:
        json.dump(json.loads(c.to_json(orient="records")), f, indent=2, ensure_ascii=False)
    shutil.copyfile(json_file, FRONTEND_DIR / json_file.name)
