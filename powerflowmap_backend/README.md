# powerflowmap_backend

「基幹送電線潮流実績可視化サイト」サーバー側のスクリプト。OCCTOサイトから潮流実績のスクレイピングを行う。デバッグ用のテストサーバーも含んでいる。

## ファイル構成

### .env

`powerflowmap_backend/` ディレクトリ直下に手動で `.env` ファイルを作成し、潮流データの保存先ディレクトリを以下のように記述する。

```
FLOW_FOLDER_PATH = "潮流データの保存先ディレクトリの絶対パス"
```

指定したディレクトリ以下は、以下のような構造にしておく。ここにダウンロードした潮流データが蓄積されていく。

```
FLOW_FOLDER_PATH/
　└ tokyo/
    ├ jisseki_tokyo_20240101.csv
　  ├ jisseki_tokyo_20240102.csv
    ...
```

### jissekiFetcher.py

- OCCTOのウェブサイトから潮流実績をスクレイピングするPythonスクリプト。
- Webサーバー側で30分おきに実行するようcrontab等に登録しておく。

### testServer.py

- フロントエンドの開発時に使うデバッグ用のHTTPサーバー。Flaskを使っている。
- `https://localhost:5000/data/tokyo/jisseki_tokyo_20240101.csv` のようにURLを指定すると、`.env` ファイルで記述したディレクトリの中から潮流実績CSVファイルを返す。
- 開発時にファイルを返すためだけの物なので、別の web server エミュレータが用意できればそちらを使っても構わない。その場合はフロントエンドの vite.config.js 内でプロキシ設定をよしなに書き替えること。

## 開発用サーバーの利用

Python 3.7.3 (venv を利用) を使います。※Raspberry Pi OS (Buster) で動かすためにいささか古いバージョンを使用している

#### Python 3.7.3 のインストール

- [Python環境構築ガイド - python.jp](https://www.python.jp/install/install.html) 等を参考にお使いのOSに合わせて実施

#### 仮想環境の作成と起動

```sh
python3.7 -m venv .venv
source .venv/bin/activate
```

#### パッケージのインストール

```sh
python -m pip install -r requirements.txt
```
