import pandas as pd
import json


if __name__ == "__main__":
    data = pd.read_csv("./itemsDrink.csv", header=None, names=["subcategory_id", "name", "price"])
    data.to_json("./itemDrink.json", orient="records", force_ascii=False)
