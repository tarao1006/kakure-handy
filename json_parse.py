import os
import json
import argparse


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('--file')
    args = parser.parse_args()
    with open(args.file) as f:
        data = json.load(f)
    data["private_key"] = data["private_key"].replace("\n", "\\n")
    print(json.dumps(data))
