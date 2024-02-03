from __future__ import annotations

import os

import dotenv
import pandas as pd
from flask import Flask
from flask_restful import Api, Resource, abort

from interpolate_flow_tokyo import interpolate_flow_tokyo

dotenv.load_dotenv()

# 潮流実績を入れるフォルダへのパス
FLOW_FOLDER_PATH = os.getenv("FLOW_FOLDER_PATH")


class Flow(Resource):
    def __init__(self) -> None:
        super().__init__()

        # 潮流実績のpd.DataFrameを保管しておく場所. csvからDataFrameを生成するのに時間がかかるので、
        # 一度アクセスがあったら日付(YYYYMMDD)を表す整数をkeyとしてdf_flow_cacheに保管しておく
        self.data_cache: dict[int, pd.DataFrame] = {}

    def get(self, area: str, year: int, month: int, day: int):
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
        print(area, year, month, day)

        # 指定日のデータがキャッシュにない場合は読み込み
        if self.data_cache.get(date) is None:
            try:
                file_name = f"{FLOW_FOLDER_PATH}/{area}/jisseki_{area}_{date:08}.csv"
                self.data_cache[date] = pd.read_csv(file_name)
            except FileNotFoundError:
                abort(404)

        # OCCTOからダウンロードした潮流データは、一部の変電所間の潮流情報が
        # 不足しているので補完し、各送電線の潮流を返す
        df_occto = self.data_cache[date]
        flows = interpolate_flow_tokyo(df_occto)

        return flows


app = Flask(__name__)
api = Api(app)
api.add_resource(Flow, "/api/flow/<string:area>/<int:year>/<int:month>/<int:day>")


if __name__ == "__main__":
    app.run(debug=True, port=5000)
