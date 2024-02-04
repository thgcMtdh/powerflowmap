from __future__ import annotations

import codecs
import datetime
import os
import platform
import time

import dotenv
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

OCCTO_MENU_URL = "https://occtonet3.occto.or.jp/public/dfw/RP11/OCCTO/SD/LOGIN_login#"

AREANAME_DICT = {
    "hokkaido": "北海道",
    "tohoku": "東北",
    "tokyo": "東京",
    "chubu": "中部",
    "hokuriku": "北陸",
    "kansai": "関西",
    "chugoku": "中国",
    "shikoku": "四国",
    "kyushu": "九州",
    "okinawa": "沖縄",
}


def main() -> None:
    area = "tokyo"
    the_date = datetime.date.today()
    while the_date <= datetime.date.today():
        try:
            fetch_csv(the_date, area)
        except UnicodeDecodeError as e:
            print(e)
            print("Try again...")

        print(the_date, "end")
        the_date = the_date + datetime.timedelta(days=1)


def fetch_csv(date: datetime.date, area: str) -> None:
    """
    OCCTO のウェブサイトをスクレイピングして、潮流実績CSVを取得し、
    .env で指定した場所に保存する。

    Parameters
    ----------
    date: 取得したい日付
    area: 取得したいエリア。"tokyo", "tohoku" などローマ字で指定する
    """

    # 保存先の設定
    dotenv.load_dotenv()
    flow_dir = os.getenv("FLOW_FOLDER_PATH") # Windows だと / ではなく \\ で区切らないとダメっぽい
    save_dir = os.path.join(flow_dir, area)  # エリアごとに別の保存先フォルダを指定

    # ChromeDriver のオプション設定
    options = Options()

    # ファイルのダウンロード先を環境変数で指定
    options.add_experimental_option("prefs", {"download.default_directory": save_dir})

    # ラズパイの場合の設定
    if platform.system() == "Linux" and platform.machine() == "armv7l":
        options.add_argument("--headless")  # 処理負荷削減のためヘッドレスモード
        options.add_argument("--no-sandbox")
        options.add_argument("--window-size=1280,720")
        user_agent = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.98 Safari/537.36"
        options.add_argument(f"user-agent={user_agent}")
        # options.add_argument("--ignore-certificate-erorrs")
        # options.add_argument("--allow-runnig-insecure-content")
        options.binary_location = "/usr/bin/chromium-browser"
        service = Service("/usr/bin/chromedriver")
    else:
        service = Service()

    # ChromeDriver起動
    with webdriver.Chrome(service=service, options=options) as driver:
        driver.implicitly_wait(30)
        driver.set_page_load_timeout(30)

        # ======
        # トップページにアクセス。
        # 余計なお知らせウィンドウが開く場合があるので閉じる。
        # ======

        # トップページ
        driver.get(OCCTO_MENU_URL)

        # トップページのウィンドウハンドルを覚えておく
        menu_window = driver.current_window_handle

        # トップページ以外のウィンドウを閉じる
        for window_handle in driver.window_handles:
            driver.switch_to.window(window_handle)
            if driver.title != "メニュー":
                driver.close()

        # トップページに戻る
        driver.switch_to.window(menu_window)

        # ======
        # 地内基幹送電線潮流実績を開く。
        # 別ウィンドウで開くので、新しいウィンドウに切り替える。
        # https://www.selenium.dev/ja/documentation/webdriver/interactions/windows/
        # ======

        # 潮流実績をクリック
        chinai_kanren_joho = driver.find_element(By.ID, "menu1-2")
        chinai_kanren_joho.click()
        chinai_choryu_jisseki = driver.find_element(By.ID, "menu1-2-2-1")
        chinai_choryu_jisseki.click()

        # 新規ウィンドウが開くまで待つ
        WebDriverWait(driver, 30).until(EC.number_of_windows_to_be(2))

        # 新規ウィンドウに切り替える
        for window_handle in driver.window_handles:
            if window_handle != menu_window:
                driver.switch_to.window(window_handle)
                break

        # ======
        # キー情報を指定してCSVをダウンロード。
        # ======

        # 要素の取得
        date_input = driver.find_element(By.ID, "tgtNngp")
        area_select = driver.find_element(By.ID, "areaCdAreaSumNon")
        volt_select = driver.find_element(By.ID, "daPtn")
        search_btn = driver.find_element(By.ID, "searchBtn")

        # 入力して検索
        date_input.clear()
        date_input.send_keys(date.strftime("%Y/%m/%d"))
        area_select.send_keys(AREANAME_DICT[area])
        volt_select.send_keys("全電圧")
        search_btn.click()

        # データ取得完了し「CSV保存」ボタンが押せるようになるまで待機
        WebDriverWait(driver, 30).until(EC.element_to_be_clickable((By.ID, "csvBtn")))

        # 「CSV保存」ボタンをクリック
        csv_btn = driver.find_element(By.ID, "csvBtn")
        csv_btn.click()
        
        # 「OK」が押せるようになるまで待機
        WebDriverWait(driver, 30).until(EC.element_to_be_clickable((By.XPATH, "/html/body/div[3]/div[3]/div/button[1]")))

        # ダイアログで「OK」を押下。これで保存される
        ok_btn = driver.find_element(By.XPATH, "/html/body/div[3]/div[3]/div/button[1]")
        ok_btn.click()

        # ダウンロードが終わるまで待機
        time.sleep(5)
        while [x for x in os.listdir(save_dir) if x.endswith(("crdownload", "tmp"))]:
            time.sleep(1)

        # ======
        # ファイルのリネーム。
        # ======

        # 保存する際のファイル名は jisseki_area_20YYmmdd.csv
        target_file = f'jisseki_{area}_{date.strftime("%Y%m%d")}.csv'
        target_file_path = os.path.join(save_dir, target_file)

        # 対象日のCSVファイルがすでに存在している場合、上書きするために一度削除
        if os.path.exists(target_file_path):
            os.remove(target_file_path)

        # ダウンロードしたファイルのファイル名を変更
        downloaded_file = get_latest_file(save_dir)
        downloaded_file_path = os.path.join(save_dir, downloaded_file)
        os.rename(downloaded_file_path, target_file_path)

        # エンコーディングをUTF-8に変更
        convert_sjis_to_unicode(target_file_path)


def get_latest_file(folder: str) -> str:
    """
    指定したフォルダの中で最も更新日時の新しいファイルのファイル名を取得する。
    """

    # フォルダ内のファイル一覧を取得
    files = os.listdir(folder)

    # ファイルの最終更新日時でソート
    files.sort(key=lambda x: os.path.getmtime(os.path.join(folder, x)))

    # 最も更新日時の新しいファイルを返す
    return files[-1]


def convert_sjis_to_unicode(file_path):
    """
    file_path (絶対パス) で指定されたファイルのエンコードを、Shift-JISから
    UTF-8に変換して上書き保存する
    """
    # shift_jisで開く
    with codecs.open(file_path, "r", "shift_jis") as f:
        row_data = []
        for row in f:
            row_data.append(row)

    # utf-8 に変換して保存
    with codecs.open(file_path, "w", "utf-8") as f:
        for row in row_data:
            f.write(row)


if __name__ == "__main__":
    main()
