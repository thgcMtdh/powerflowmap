from __future__ import annotations

import numpy as np
import pandas as pd


def interpolate_flow_tokyo(df_occto: pd.DataFrame) -> list[dict]:
    """
    OCCTOから落とした実績CSVで潮流値が公表されていない部分を補完し、フロントに渡す潮流データを作る。
    結果は json に変換しやすい list[dict] の形で返す。
    """

    flows = []

    # まずは値をそのまま転記できるものを埋める

    flows.append({"name": "川内線", "amounts": get_line_value(df_occto, "川内線")})
    flows.append({"name": "南いわき幹線", "amounts": get_line_value(df_occto, "南いわき幹線")})
    flows.append({"name": "新いわき線", "amounts": get_line_value(df_occto, "新いわき線")})
    flows.append({"name": "福島幹線(中)", "amounts": get_line_value(df_occto, "福島幹線(中)")})
    flows.append({"name": "福島東幹線(里)", "amounts": get_line_value(df_occto, "福島東幹線(里)")})
    flows.append({"name": "新茂木線", "amounts": get_line_value(df_occto, "新茂木線")})
    flows.append({"name": "福島幹線(里)", "amounts": get_line_value(df_occto, "福島幹線(里)")})
    flows.append({"name": "中栃木線", "amounts": get_line_value(df_occto, "中栃木線")})
    flows.append({"name": "新栃木線", "amounts": get_line_value(df_occto, "新栃木線")})
    flows.append({"name": "新袖ヶ浦線", "amounts": get_line_value(df_occto, "新袖ヶ浦線")})
    flows.append({"name": "房総線", "amounts": get_line_value(df_occto, "房総線")})
    flows.append({"name": "印旛線", "amounts": get_line_value(df_occto, "印旛線")})
    flows.append({"name": "新佐原線", "amounts": get_line_value(df_occto, "新佐原線")})
    flows.append({"name": "新筑波線", "amounts": get_line_value(df_occto, "新筑波線")})
    flows.append({"name": "東群馬幹線", "amounts": get_line_value(df_occto, "東群馬幹線")})
    flows.append({"name": "新赤城線", "amounts": get_line_value(df_occto, "新赤城線")})
    flows.append({"name": "新新田線", "amounts": get_line_value(df_occto, "新新田線")})
    flows.append({"name": "新坂戸線", "amounts": get_line_value(df_occto, "新坂戸線")})
    flows.append({"name": "新岡部線", "amounts": get_line_value(df_occto, "新岡部線")})
    flows.append({"name": "新吾妻線", "amounts": get_line_value(df_occto, "新吾妻線")})
    flows.append({"name": "西上武幹線", "amounts": get_line_value(df_occto, "西上武幹線")})
    flows.append({"name": "新榛名線", "amounts": get_line_value(df_occto, "新榛名線")})
    flows.append({"name": "新秦野線", "amounts": get_line_value(df_occto, "新秦野線")})
    flows.append({"name": "新多摩線", "amounts": get_line_value(df_occto, "新多摩線")})
    flows.append({"name": "新秩父線", "amounts": get_line_value(df_occto, "新秩父線")})
    flows.append({"name": "新豊洲線", "amounts": get_line_value(df_occto, "新豊洲線")})

    # 計算が必要な送電線について追記

    # 新古河変電所の出入りから、新京葉線Bが求まる
    flows.append({"name": "新京葉線A", "amounts": get_line_value(df_occto, "新京葉線")})
    flows.append(
        {
            "name": "新京葉線B",
            "amounts": (
                np.array(get_line_value(df_occto, "新古河線"))
                + np.array(get_line_value(df_occto, "港北線"))
                - np.array(get_line_value(df_occto, "新筑波線"))
                - np.array(get_line_value(df_occto, "福島幹線(里)"))
            ).tolist(),
        }
    )
    # 新所沢変電所の出入りから、新古河線Bが求まる
    flows.append({"name": "新古河線A", "amounts": get_line_value(df_occto, "新古河線")})
    flows.append(
        {
            "name": "新古河線B",
            "amounts": (
                np.array(get_line_value(df_occto, "新古河線"))
                + np.array(get_line_value(df_occto, "西上武幹線"))
                - np.array(get_line_value(df_occto, "新所沢線"))
                - np.array(get_line_value(df_occto, "中沢線"))
                - np.array(get_line_value(df_occto, "南狭山線"))
            ).tolist(),
        }
    )
    # 新飯能変電所の出入りから、新所沢線Bが求まる
    flows.append({"name": "新所沢線A", "amounts": get_line_value(df_occto, "新所沢線")})
    flows.append(
        {
            "name": "新所沢線B",
            "amounts": (
                np.array(get_line_value(df_occto, "新所沢線"))
                - np.array(get_line_value(df_occto, "青梅線"))
            ).tolist(),
        }
    )
    # 西群馬幹線は、途中に揚水や需要があって正確な値を計算できないので、そのまま返す
    flows.append({"name": "西群馬幹線A", "amounts": get_line_value(df_occto, "西群馬幹線")})
    flows.append({"name": "西群馬幹線B", "amounts": get_line_value(df_occto, "西群馬幹線")})
    # 新秩父変電所の出入りから、安曇幹線が求まる
    flows.append(
        {
            "name": "安曇幹線",
            "amounts": (
                np.array(get_line_value(df_occto, "新秩父線"))
                - np.array(get_line_value(df_occto, "新岡部線"))
                - np.array(get_line_value(df_occto, "新榛名線"))
            ).tolist(),
        }
    )
    # 東群馬変電所の出入りから、奥只見線が求まる
    flows.append(
        {
            "name": "奥只見線",
            "amount": (
                np.array(get_line_value(df_occto, "東群馬幹線"))
                + np.array(get_line_value(df_occto, "新赤城線"))
                - np.array(get_line_value(df_occto, "南いわき幹線"))
            ).tolist(),
        }
    )
    # 西群馬開閉所の出入りから、南新潟幹線+新新潟幹線の和が求まる
    flows.append(
        {
            "name": "南新潟幹線・新新潟幹線",
            "amount": (
                np.array(get_line_value(df_occto, "西群馬幹線"))
                + np.array(get_line_value(df_occto, "西上武幹線"))
                - np.array(get_line_value(df_occto, "新吾妻線"))
                - np.array(get_line_value(df_occto, "東群馬幹線"))
            ).tolist(),
        }
    )
    # 新榛名変電所の出入りから、玉原線+中東京幹線の和が求まる
    flows.append(
        {
            "name": "玉原線・中東京幹線",
            "amoutns": (
                np.array(get_line_value(df_occto, "新榛名線"))
                + np.array(get_line_value(df_occto, "新吾妻線"))
            ).tolist(),
        }
    )
    # 新今市変電所の出入りから、下郷線+塩原線の和が求まる
    flows.append(
        {
            "name": "下郷線・塩原線",
            "amount": (
                np.array(get_line_value(df_occto, "中栃木線"))
                - np.array(get_line_value(df_occto, "新いわき線"))
            ).tolist(),
        }
    )
    # 新いわき開閉所の出入りから、福島幹線(山)+福島東幹線(山)+広野火力線の和が求まる
    # 常時開放の予備用東北-東京連系線であるいわき幹線には潮流が流れない前提
    # (https://www.occto.or.jp/iinkai/kouikikeitouseibi/2015/files/seibi_10_01.pdf)
    flows.append(
        {
            "name": "福島幹線(山)・福島東幹線(山)・広野火力線",
            "amount": (
                np.array(get_line_value(df_occto, "新いわき線"))
                + np.array(get_line_value(df_occto, "福島幹線(中)"))
                + np.array(get_line_value(df_occto, "福島東幹線(里)"))
                - np.array(get_line_value(df_occto, "川内線"))
            ).tolist(),
        }
    )
    # 南いわき開閉所の出入りから、相馬双葉幹線が求まる
    flows.append(
        {
            "name": "相馬双葉幹線",
            "amount": (
                np.array(get_line_value(df_occto, "川内線"))
                + np.array(get_line_value(df_occto, "南いわき幹線"))
            ).tolist(),
        }
    )
    return flows


def get_line_value(df_occto: pd.DataFrame, line_name: str) -> list[int]:
    """
    OCCTOからダウンロードした潮流実績CSVファイルのデータを読み込んで、
    line_name で指定された送電線の潮流30分値を1次元リストで返す。
    [300, 320, ....] のような形
    """

    # 引数で指定された送電線の行を抜き出す
    df_line = df_occto[df_occto["送電線名"] == line_name]

    # 潮流値が書かれている6列目以降を切り出す
    series = df_line.iloc[0, 5:]
    series = series.fillna(0)  # 欠損値はゼロ埋め

    # リストに変換し、整数で返す
    return [int(x) for x in series.values.tolist()]


if __name__ == "__main__":
    df_occto = pd.read_csv("data/jisseki/jisseki_tokyo_20220602.csv")
    print(interpolate_flow_tokyo(df_occto))
