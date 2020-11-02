# kakure-handy

# 設計

- db設計:
  - [DATABASE.md](https://github.com/tarao1006/kakure-handy/blob/main/docs/DATABASE.md)
  - [dbdiagram](https://dbdiagram.io/d/5f428b1b7b2e2f40e9de732b)
- api設計:
  - [API.md](https://github.com/tarao1006/kakure-handy/blob/main/docs/api.md)

- UI設計:
  - [Figma](https://www.figma.com/file/3u0kFdz8wLaLYLJ91gYanK/kakure-handi?node-id=0%3A1) (WireFrame)

# ビルド

## 開発環境

- docker-compose.yml
- 起動

```shell
make docker-compose/up
```

- ビルド

```shell
make docker-compose/prod/build
```

- バックエンド
  - `./docker/backend/Dockerfile`
  - ポートは `8000`
  - firebaseの設定ファイルをローカルからコンテナにコピーしている。
  - `reflex` によりホットリローディングを行っている。
- フロントエンド
  - `./docker/frontend/Dockerfile`
  - ポートは `8080` で、 `webpackDevServer` を起動している。
  - 環境変数は、 `firebase.env` およびdocker-compose.yml内の `environment `によって設定されている。
  - webpackの設定ファイルは、 `webpack.dev.js`
    - 環境変数の反映は、 `webpack.EnvironmentPlugin` によって行われている。

## 本番環境

- docker-compose.prod.yml
- 起動

```shell
make docker-compose/prod/up
```

- ビルド

```shell
make docker-compose/prod/build
```

- バックエンド
  - `./docker/backend/Dockerfile.production`
  - ポートは `8000`
  - firebaseの設定ファイルは、ビルド時の引数にファイルの中身の文字列を渡し、コンテナ内のファイルに出力している。
    - `private_key` に含まれる '\n' を '\\\n'にエスケープする必要があるため、 `python json_parse.py` を実行している。
    - AWSでうまく動くか確認する必要がある。
  - docker-composeを使う場合、 `build.args` に環境変数を定義している。
    - AWSではどのようにするか確認する必要がある。
- フロントエンド
  - `./docker/frontend/Dockerfile.production`
  - ポートは `80` で、 `nginx` を使用している。
  - 環境変数は、 ビルド時に引数として渡す。
  - docker-composeを使う場合、 `build.args` に環境変数を定義している。
    - AWSではどのようにするか確認する必要がある。
  - webpackの設定ファイルは、 `webpack.prod.js`
    - 環境変数の反映は、 `webpack.DefinePlugin` によって行われている。
