import os

import dotenv
from flask import Flask, abort, send_file

dotenv.load_dotenv()  # .envファイルから環境変数の読み込み

FLOW_FOLDER_PATH = os.getenv("FLOW_FOLDER_PATH")  # 潮流実績を保存したフォルダ

app = Flask(__name__)

@app.route("/data/<string:area>/<string:filename>")
def download_csv(area: str, filename: str):
    """
    指定した日付,エリアの1日分の潮流実績CSVを返すエンドポイント
    usage: `/data/tokyo/jisseki_20220602.csv`
    """
    file_path = os.path.join(FLOW_FOLDER_PATH, area, filename)
    if os.path.exists(file_path):
        return send_file(file_path, mimetype="text/csv")
    else:
        abort(404)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
