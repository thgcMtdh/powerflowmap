from __future__ import annotations

import os

import dotenv
from flask import Flask, abort, send_file

dotenv.load_dotenv()  # .envファイルから環境変数の読み込み

FLOW_FOLDER_PATH = os.getenv("FLOW_FOLDER_PATH")  # 潮流実績を保存したフォルダ

app = Flask(__name__)

@app.route("/api/flow/<string:area>/<int:year>/<int:month>/<int:day>")
def download(area: str, year: int, month: int, day: int):
    """
    指定した日付,エリアの1日分の潮流データを取得するAPI

    --------
    usage: `/api/flow/tokyo/2022/6/2`
    `year`: 年
    `month`: 月
    `day`: 日
    `area`: エリア. 現時点では tokyo のみ受け付ける
    """

    date = year * 10000 + month * 100 + day
    file_name = f"jisseki_{area}_{date:08}.csv"
    file_path = f"{FLOW_FOLDER_PATH}/{area}/" + file_name
    if os.path.exists(file_path):
        return send_file(file_path, mimetype="text/csv")
    else:
        abort(404)


if __name__ == "__main__":
    app.run(debug=True, port=5000)
