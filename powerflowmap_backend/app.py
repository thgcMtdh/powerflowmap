from __future__ import annotations

import pandas as pd
from flask import Flask, render_template, request
from flask_restful import Api, Resource, abort

# 送電線情報を含むファイルへのパス
LINE_FILE_PATH = "data/soudensen.csv"

# 潮流実績を入れるフォルダへのパス
FLOW_FOLDER_PATH = "data/jisseki"

# def compute_flow(df_flow: pd.DataFrame, time: int) -> dict:
#     """
#     OCCTOの生データから各lineの潮流を推定して返す

#     Parameters
#     ----------
#     `df_flow` : `pandas.DataFrame`
#         OCCTOの日潮流実績CSVファイルから生成したDataFrame
#     `time` : `int`
#         0:00 を 0, 23:30 を 47 とする0～47の整数で表した時刻
#     """

#     time_str = f'{(time // 2):02}:{(time % 2 * 30):02}'  # 0～48を、hh:mm の形にする
#     df_flow_time = df_flow.loc[:, ['送電線名', '潮流方向(正方向)', time_str]]  # df_flow から時刻timeのデータを抜き出す

#     # 潮流を推定する計算(大部分は同じ値だが、一部の送電線では推定が必要)
#     retval: dict[str, float] = {
#         'inba': df_flow_time.query('送電線名=="inba"'),
#     }


class Line(Resource):
    def __init__(self) -> None:
        super().__init__()

        # 送電線情報の読み込み
        self.df_line = pd.read_csv(LINE_FILE_PATH)

    def get(self):
        """
        すべての送電線情報を取得する
        """

        df_res = self.df_line.dropna(subset=["direction"])  # labelがNaNである列は除外
        return [
            {
                "name": df_res.iloc[i]["name"],
                "from": df_res.iloc[i]["from"],
                "to": df_res.iloc[i]["to"],
                "voltage": int(df_res.iloc[i]["電圧(kV)"]),
                "capacity": int(df_res.iloc[i]["運用容量(MW)"]),
            }
            for i in range(len(df_res.index))
        ]


class Flow(Resource):
    def __init__(self) -> None:
        super().__init__()

        # 潮流実績のpd.DataFrameを保管しておく場所. csvからDataFrameを生成するのに時間がかかるので、
        # 一度アクセスがあったら日付(YYYYMMDD)を表す整数をkeyとしてdf_flow_cacheに保管しておく
        self.df_flow_cache: dict[int, pd.DataFrame] = {}

    def get(self):
        """
        指定した日付,エリアの1日分の潮流データを取得するAPI

        --------
        usage: `/flow?year=2022&month=6&day=2&area=tokyo`
        `year`: 年
        `month`: 月
        `day`: 日
        `area`: エリア. 現時点では tokyo のみ受け付ける
        """
        date_int = (
            int(request.args.get("year")) * 10000
            + int(request.args.get("month")) * 100
            + int(request.args.get("day"))
        )
        area = request.args.get("area")

        # 指定日のデータがキャッシュにない場合は読み込み
        if self.df_flow_cache.get(date_int) == None:
            try:
                file_name = f"{FLOW_FOLDER_PATH}/jisseki_{area}_{date_int:08}.csv"
                self.df_flow_cache[date_int] = pd.read_csv(file_name)  # 潮流実績の読み込み
            except FileNotFoundError as e:
                abort(404)

        # OCCTOからダウンロードした生CSVのデータを適切なjsonに変換して送信
        df_res = self.df_flow_cache[date_int]
        return [
            {"送電線名": "印旛線", "潮流方向(正方向)": "新佐原 → 新京葉", "潮流": []}
            for i in range(len(df_res.index))
        ]


app = Flask(__name__)
api = Api(app)
api.add_resource(Line, "/line")
# api.add_resource(Flow, '/flow')


if __name__ == "__main__":
    app.run(debug=True, port=5000)
