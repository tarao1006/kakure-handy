import sys
import json
import shutil
import pandas as pd
from pathlib import Path

CSV_DIR = Path("./csv")
JSON_DIR = Path("./json")
SQL_DIR = Path("./sql")
SQL_DIR = Path("./sql")
FRONTEND_DIR = Path("../frontend/dataset")
MIGRATION_DIR = Path("../database/migration")

NAMES = {
    'item_category_type',
    'item_category',
    'menu_item',
    'order_status',
    'room'
}

MIGRATION_PREFIX = {
    'item_category_type': 'V1_2_1',
    'item_category': 'V1_2_2',
    'menu_item': 'V1_2_3',
    'order_status': 'V1_3_1',
    'room': 'V1_4_1'
}


def stringify(value):
    if isinstance(value, str):
        return f'"{value}"'
    else:
        return f'{value}'


def replace_separator(value):
    if isinstance(value, str):
        return value.replace('-', ', ')
    else:
        return value


if __name__ == "__main__":
    name = sys.argv[1]

    if name not in NAMES:
        raise ValueError('invalid name')

    csv_file = CSV_DIR / f'{name}.csv'
    json_file = JSON_DIR / f'{name}.json'
    sql_file = SQL_DIR / f'{name}.sql'
    c = pd.read_csv(csv_file).applymap(replace_separator)
    columns = ', '.join(c.columns)

    with open(json_file, 'w', encoding='utf-8') as f:
        json.dump(json.loads(c.to_json(orient="records")), f, indent=2, ensure_ascii=False)
    with open(sql_file, 'w') as f:
        for _, data in c.iterrows():
            values = ', '.join(data.map(stringify).values)
            print(f'INSERT INTO {name} ({columns}) VALUES ({values});', file=f)

    shutil.copy(json_file, FRONTEND_DIR / json_file.name)
    shutil.copy(sql_file, MIGRATION_DIR / f'{MIGRATION_PREFIX[name]}__insert_data_{name}.sql')
