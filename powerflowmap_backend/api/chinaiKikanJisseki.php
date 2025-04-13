<?php

const LOGIN_URL = 'https://occtonet3.occto.or.jp/public/dfw/RP11/OCCTO/SD/LOGIN_login';
const DOWNLOAD_URL = 'https://occtonet3.occto.or.jp/public/dfw/RP11/OCCTO/SD/CB01S020C';
const LOGOUT_URL = 'https://occtonet3.occto.or.jp/public/dfw/RP11/OCCTO/SD/LOGOUT';

const HEADER_TEMPLATE_FOR_CONTENTS = [
    'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'Accept-Encoding: gzip, deflate, br, zstd',
    // 'Accept-Language: ja-JP,ja;q=0.9,en-US;q=0.8,en;q=0.7',
    'Connection: keep-alive',
    'Host: occtonet3.occto.or.jp',
    // 'Sec-Fetch-Dest: document',
    // 'Sec-Fetch-Mode: navigate',
    // 'Sec-Fetch-Site: none',
    // 'Sec-Fetch-User: ?1',
    // 'Upgrade-Insecure-Requests: 1',
    'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
    // 'sec-ch-ua: \"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Google Chrome\";v=\"134\"',
    // 'sec-ch-ua-mobile: ?0',
    // 'sec-ch-ua-platform: \"Windows\"'
];
const HEADER_TEMPLATE_FOR_AJAX = [
    'Accept: application/json, text/javascript, */*; q=0.01',
    'Accept-Encoding: gzip, deflate, br, zstd',
    // 'Accept-Language: ja-JP,ja;q=0.9,en-US;q=0.8,en;q=0.7',
    'Connection: keep-alive',
    'Host: occtonet3.occto.or.jp',
    // 'Sec-Fetch-Dest: empty',
    // 'Sec-Fetch-Mode: cors',
    // 'Sec-Fetch-Site: same-origin',
    'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
    'sdReqType: AJAX',
    // 'sec-ch-ua: \"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Google Chrome\";v=\"134\"',
    // 'sec-ch-ua-mobile: ?0',
    // 'sec-ch-ua-platform: \"Windows\"'
];
const REQUEST_BODY_TEMPLATE = [
    'fwExtention.actionType' => '',     // 操作を指定する文字列. 状況に応じてセットする
    'fwExtention.actionSubType' => '',  // 操作を指定する文字列. 状況に応じてセットする
    // 'fwExtention.pagingTargetTable' => '',
    'fwExtention.pathInfo' => 'CB01S020C',  // 閲覧したいデータを指定する文字列
    // 'fwExtention.prgbrh' => '0',
    'fwExtention.formId' => 'CB01S020P',  // 閲覧したいデータを指定する文字列
    // 'fwExtention.jsonString' => '',
    // 'ajaxToken' => '',
    'requestToken' => '',
    // 'requestTokenBk' => '',
    // 'transitionContextKey' => 'DEFAULT',
    // 'tgtNngp' => '2025/04/05',
    'tgtNngpHdn' => '20250405',  // 対象年月日
    'downloadKey' => '',
    'areaCdAreaSumNon' => '03',  // 対象エリア
    'tgtAreaHdn' => '03',  // 対象エリア
    // 'daPtn' => '00',
    'tgtDaHdn' => '00',  // 対象電圧. 00:全電圧、500,275,220,187,132:電圧指定
    'searchReqHdn' => '[検索条件]対象年月日:2025/04/05,対象エリア:東京,対象電圧:全電圧',
    // 'daPtn1' => '187',
    // 'daPtn2' => '275',
    // 'daPtn3' => '220',
    // 'daPtn4' => '187',
    // 'daPtn5' => '132',
    // 'table1.dispRowNum' => '20',
    // 'table1.rows[0].rowParams.originRowIndex' => '',
    // 'table1.rows[0].rowParams.rowAddUpdate' => '',
    // 'table1.rows[0].rowParams.rowDelete' => '',
    // 'table1.rows[0].rowParams.rowNum' => '1',
    // 'table1.rows[0].rowParams.selected' => '',
    // 'table1.rows[1].rowParams.originRowIndex' => '',
    // 'table1.rows[1].rowParams.rowAddUpdate' => '',
    // 'table1.rows[1].rowParams.rowDelete' => '',
    // 'table1.rows[1].rowParams.rowNum' => '2',
    // 'table1.rows[1].rowParams.selected' => '',
    // 'table1.rows[2].rowParams.originRowIndex' => '',
    // 'table1.rows[2].rowParams.rowAddUpdate' => '',
    // 'table1.rows[2].rowParams.rowDelete' => '',
    // 'table1.rows[2].rowParams.rowNum' => '3',
    // 'table1.rows[2].rowParams.selected' => '',
    // 'table1.rows[3].rowParams.originRowIndex' => '',
    // 'table1.rows[3].rowParams.rowAddUpdate' => '',
    // 'table1.rows[3].rowParams.rowDelete' => '',
    // 'table1.rows[3].rowParams.rowNum' => '4',
    // 'table1.rows[3].rowParams.selected' => '',
    // 'table1.rows[4].rowParams.originRowIndex' => '',
    // 'table1.rows[4].rowParams.rowAddUpdate' => '',
    // 'table1.rows[4].rowParams.rowDelete' => '',
    // 'table1.rows[4].rowParams.rowNum' => '5',
    // 'table1.rows[4].rowParams.selected' => '',
    // 'table1.rows[5].rowParams.originRowIndex' => '',
    // 'table1.rows[5].rowParams.rowAddUpdate' => '',
    // 'table1.rows[5].rowParams.rowDelete' => '',
    // 'table1.rows[5].rowParams.rowNum' => '6',
    // 'table1.rows[5].rowParams.selected' => '',
    // 'table1.rows[6].rowParams.originRowIndex' => '',
    // 'table1.rows[6].rowParams.rowAddUpdate' => '',
    // 'table1.rows[6].rowParams.rowDelete' => '',
    // 'table1.rows[6].rowParams.rowNum' => '7',
    // 'table1.rows[6].rowParams.selected' => '',
    // 'table1.rows[7].rowParams.originRowIndex' => '',
    // 'table1.rows[7].rowParams.rowAddUpdate' => '',
    // 'table1.rows[7].rowParams.rowDelete' => '',
    // 'table1.rows[7].rowParams.rowNum' => '8',
    // 'table1.rows[7].rowParams.selected' => '',
    // 'table1.rows[8].rowParams.originRowIndex' => '',
    // 'table1.rows[8].rowParams.rowAddUpdate' => '',
    // 'table1.rows[8].rowParams.rowDelete' => '',
    // 'table1.rows[8].rowParams.rowNum' => '9',
    // 'table1.rows[8].rowParams.selected' => '',
    // 'table1.rows[9].rowParams.originRowIndex' => '',
    // 'table1.rows[9].rowParams.rowAddUpdate' => '',
    // 'table1.rows[9].rowParams.rowDelete' => '',
    // 'table1.rows[9].rowParams.rowNum' => '10',
    // 'table1.rows[9].rowParams.selected' => '',
    // 'table1.rows[10].rowParams.originRowIndex' => '',
    // 'table1.rows[10].rowParams.rowAddUpdate' => '',
    // 'table1.rows[10].rowParams.rowDelete' => '',
    // 'table1.rows[10].rowParams.rowNum' => '11',
    // 'table1.rows[10].rowParams.selected' => '',
    // 'table1.rows[11].rowParams.originRowIndex' => '',
    // 'table1.rows[11].rowParams.rowAddUpdate' => '',
    // 'table1.rows[11].rowParams.rowDelete' => '',
    // 'table1.rows[11].rowParams.rowNum' => '12',
    // 'table1.rows[11].rowParams.selected' => '',
    // 'table1.rows[12].rowParams.originRowIndex' => '',
    // 'table1.rows[12].rowParams.rowAddUpdate' => '',
    // 'table1.rows[12].rowParams.rowDelete' => '',
    // 'table1.rows[12].rowParams.rowNum' => '13',
    // 'table1.rows[12].rowParams.selected' => '',
    // 'table1.rows[13].rowParams.originRowIndex' => '',
    // 'table1.rows[13].rowParams.rowAddUpdate' => '',
    // 'table1.rows[13].rowParams.rowDelete' => '',
    // 'table1.rows[13].rowParams.rowNum' => '14',
    // 'table1.rows[13].rowParams.selected' => '',
    // 'table1.rows[14].rowParams.originRowIndex' => '',
    // 'table1.rows[14].rowParams.rowAddUpdate' => '',
    // 'table1.rows[14].rowParams.rowDelete' => '',
    // 'table1.rows[14].rowParams.rowNum' => '15',
    // 'table1.rows[14].rowParams.selected' => '',
    // 'table1.rows[15].rowParams.originRowIndex' => '',
    // 'table1.rows[15].rowParams.rowAddUpdate' => '',
    // 'table1.rows[15].rowParams.rowDelete' => '',
    // 'table1.rows[15].rowParams.rowNum' => '16',
    // 'table1.rows[15].rowParams.selected' => '',
    // 'table1.rows[16].rowParams.originRowIndex' => '',
    // 'table1.rows[16].rowParams.rowAddUpdate' => '',
    // 'table1.rows[16].rowParams.rowDelete' => '',
    // 'table1.rows[16].rowParams.rowNum' => '17',
    // 'table1.rows[16].rowParams.selected' => '',
    // 'table1.rows[17].rowParams.originRowIndex' => '',
    // 'table1.rows[17].rowParams.rowAddUpdate' => '',
    // 'table1.rows[17].rowParams.rowDelete' => '',
    // 'table1.rows[17].rowParams.rowNum' => '18',
    // 'table1.rows[17].rowParams.selected' => '',
    // 'table1.rows[18].rowParams.originRowIndex' => '',
    // 'table1.rows[18].rowParams.rowAddUpdate' => '',
    // 'table1.rows[18].rowParams.rowDelete' => '',
    // 'table1.rows[18].rowParams.rowNum' => '19',
    // 'table1.rows[18].rowParams.selected' => '',
    // 'table1.rows[19].rowParams.originRowIndex' => '',
    // 'table1.rows[19].rowParams.rowAddUpdate' => '',
    // 'table1.rows[19].rowParams.rowDelete' => '',
    // 'table1.rows[19].rowParams.rowNum' => '20',
    // 'table1.rows[19].rowParams.selected' => '',
    // 'table1.startIndex' => '1',
    // 'table1.endIndex' => '20',
    // 'table1.currentPage' => '1',
    // 'table1.totalPage' => '5',
    // 'table1.tableIdToken' => '',
    // 'table1.nextPageStartIndex' => '1',
    // 'table1.pagingMode' => 'readOnly',
    // 'msgArea' => '',
    // 'updDaytime' => '2025年04月05日 10時00分更新',
];
const AREA_LIST = ['北海道','東北','東京','中部','北陸','関西','中国','四国','九州','沖縄'];

/**
 * 検索条件をセットしたリクエストペイロードを作成する
 * @param int    $targetArea 電力エリア. 1:北海道,...,9:九州
 * @param string $targetDateStr 指定日付. '20250404'のような文字列で指定
 * @return array Request Body となる連想配列を返す
 */
function createRequestPayloadWithSearchCond($targetArea, $targetDateStr) {
    $data = REQUEST_BODY_TEMPLATE;
    $data['areaCdAreaSumNon'] = str_pad($targetArea, 2, '0', STR_PAD_LEFT);  // '02'のような文字列に
    $data['tgtAreaHdn'] = str_pad($targetArea, 2, '0', STR_PAD_LEFT);
    $data['tgtNngpHdn'] = $targetDateStr;

    $areaName = AREA_LIST[$targetArea - 1];  // エリア名
    $targetDateTime = DateTime::createFromFormat('Ymd', $targetDateStr);
    $formatted = $targetDateTime->format('Y/m/d');  // '2025/04/12'形式に変換
    $data['searchReqHdn'] = "[検索条件]対象年月日:" . $formatted . ", 対象エリア:" . $areaName . ",対象電圧:全電圧";

    return $data;
}

/**
 * OCCTOサイトにログインする. ログインに成功すると、セッション情報を保存するファイルを生成する
 * @param \CurlHandle $ch curlセッション
 * @return string|bool ログイン成功時、cookieファイルへのフルパス、失敗時: false
 */
function login($ch) {
    $cookieFile = tempnam(sys_get_temp_dir(),"cookie_");

    // ログインリクエストを送信
    curl_setopt($ch, CURLOPT_URL, LOGIN_URL);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, '');
    curl_setopt($ch, CURLOPT_HTTPHEADER, HEADER_TEMPLATE_FOR_CONTENTS); // ヘッダーを追加
    curl_setopt($ch, CURLOPT_COOKIEJAR, $cookieFile); // クッキーを保存
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($ch);

    if (!$response) {
        return false;
    }

    return $cookieFile;
}

/**
 * OCCTOサイトからログアウトする.
 * @param \CurlHandle $ch curlセッション
 * @param string $cookieFile Cookieファイルへのフルパス
 * @return bool true: ログアウト成功、false: ログアウト失敗
 */
function logout($ch, $cookieFile) {
    // ログアウトリクエストを送信
    curl_setopt($ch, CURLOPT_URL, LOGOUT_URL);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, '');
    curl_setopt($ch, CURLOPT_HTTPHEADER, HEADER_TEMPLATE_FOR_CONTENTS); // ヘッダーを追加
    curl_setopt($ch, CURLOPT_COOKIEFILE, $cookieFile); // クッキーを利用
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($ch);

    if (!$response) {
        return false;
    }

    return true;
}

/**
 * CSVダウンロードに必要なトークンを取得する
 * @param \CurlHandle $ch curlセッション
 * @param string      $cookieFile Cookieファイルへのフルパス
 * @param int         $targetArea 電力エリア. 1:北海道,...,9:九州
 * @param string      $targetDateStr ダウンロードしたい日付. "20250404"のような文字列で指定
 * @return array{ downloadKey: string, requestToken: string } | null
 */
function getToken($ch, $cookieFile, $targetArea, $targetDateStr) {
    //送信するクエリを設定
    $data = createRequestPayloadWithSearchCond($targetArea, $targetDateStr);
    $data["fwExtention.actionType"] = "reference";
    $data["fwExtention.actionSubType"] = "printOK";

    curl_setopt($ch, CURLOPT_URL, DOWNLOAD_URL);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_HTTPHEADER, HEADER_TEMPLATE_FOR_AJAX); // ヘッダーを追加
    curl_setopt($ch, CURLOPT_COOKIEFILE, $cookieFile); // 保存したクッキーを利用

    $contents = curl_exec($ch);

    if ($contents === false) {
        return null;
    }

    //デコード
    $contentsJson = json_decode($contents);

    //ワンタイムトークンを抽出
    if (!$contentsJson) {
        return null;
    }
    if (!isset($contentsJson->root->bizRoot->header->downloadKey->value)) {
        return null;
    }
    if (!isset($contentsJson->root->bizRoot->header->requestToken->value)) {
        return null;
    }

    $downloadKey = $contentsJson->root->bizRoot->header->downloadKey->value;
    $requestToken = $contentsJson->root->bizRoot->header->requestToken->value;

    if ($downloadKey == "" || $requestToken == "") {
        return null;
    }

    return [
        'downloadKey' => $downloadKey,
        'requestToken' => $requestToken
    ];
}

/**
 * トークンを使ってファイルをダウンロードする
 * @param \CurlHandle $ch curlセッション
 * @param string      $cookieFile Cookieファイルへのフルパス
 * @param array       $keyAndToken array("downloadKey" => $downloadKey, "requestToken" => $requestToken)
 * @param int         $targetArea 電力エリア. 1:北海道,...,9:九州
 * @param string      $targetDateStr 指定日付. "20250404"のような文字列で指定
 * @return string|bool ダウンロードに成功した場合、CSV形式の潮流データを返す。encodingはUTF-8
 *                     失敗した場合、falseを返す
 */
function download($ch, $cookieFile, $keyAndToken, $targetArea, $targetDateStr) {
    //送信するクエリを設定
    $data = createRequestPayloadWithSearchCond($targetArea, $targetDateStr);
    $data["fwExtention.actionType"] = "reference";
    $data["fwExtention.actionSubType"] = "download";
    $data["requestToken"] = $keyAndToken["requestToken"];
    $data["downloadKey"] = $keyAndToken["downloadKey"];

    curl_setopt($ch, CURLOPT_URL, DOWNLOAD_URL);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_HTTPHEADER, HEADER_TEMPLATE_FOR_CONTENTS); // ヘッダーを追加
    curl_setopt($ch, CURLOPT_COOKIEFILE, $cookieFile); // 保存したクッキーを利用

    $contents = curl_exec($ch);

    if (!$contents) {
        return false;
    }

    //エンコーディングをSJISからUTF-8に変換
    $contents = mb_convert_encoding($contents, 'UTF-8', 'SJIS');

    //出力
    return $contents;
}

/**
 * バリデーション成功した場合のスクレイピング処理
 * @param \CurlHandle $ch curlセッション
 * @param int         $targetArea 電力エリア. 1:北海道,...,9:九州
 * @param string      $targetDateStr 指定日付. "20250404"のような文字列で指定
 */
function scrapingCSV($ch, $targetArea, $targetDateStr) {
    if (!$ch) {
        return false;
    }

    $cookieFile = login($ch);  // ログインし、cookie情報を保存する
    if (!$cookieFile) {
        return false;
    }
    $keyAndToken = getToken($ch, $cookieFile, $targetArea, $targetDateStr);  // ダウンロードトークン取得
    if (!$keyAndToken) {
        logout($ch, $cookieFile);
        unlink($cookieFile);  // cookie情報を削除する
        return false;
    }
    $csv = download($ch, $cookieFile, $keyAndToken, $targetArea, $targetDateStr);  // ダウンロード
    if (!$csv) {
        logout($ch, $cookieFile);
        unlink($cookieFile);  // cookie情報を削除する
        return false;
    }

    curl_close($ch);  // セッションを終了
    unlink($cookieFile);  // cookie情報を削除する

    return $csv;  // ダウンロード結果を返す
}

// バリデーション関数
function validateTargetArea($area) {
    return filter_var($area, FILTER_VALIDATE_INT, ['options' => ['min_range' => 1, 'max_range' => 10]]);
}
function validateTargetDate($date) {
    return preg_match('/^\d{8}$/', $date); // 8桁の数字のみ許可
}

// 30分コマ(0～47)を計算する関数
function calcKoma($timeString) {
    list($hour, $minute) = explode(":", $timeString);  // コロンで分割して抽出
    $hour = (int)$hour; // 整数型に変換
    $minute = (int)$minute; // 整数型に変換
    return intdiv(60 * $hour + $minute, 30);  // 商を取得
}

// ファイルパスを作成
function createFilePath($targetArea, $targetDateStr) {
    return "data/chinaiKikanJisseki/chinaiKikanJisseki_" . str_pad($targetArea, 2, '0', STR_PAD_LEFT) . "_" . $targetDateStr . ".csv";
}

// ファイル名を作成
function createFileName($targetArea, $targetDateStr) {
    return "chinaiKikanJisseki_" . str_pad($targetArea, 2, '0', STR_PAD_LEFT) . "_" . $targetDateStr . ".csv";
}

// CSVのスクレイピングが必要か判定する関数
function shouldUpdateCSV($targetArea, $targetDateStr, $currentDateStr, $currentTimeStr) {
    // CSVファイルパス
    $filePath = createFilePath($targetArea, $targetDateStr);

    if ($targetDateStr === $currentDateStr) {
        // $targetDateStr が本日の場合
        
        if (!file_exists($filePath)) {
            // ファイルが存在しない場合は、取得すべき
            return true;

        } else {
            // ファイルが存在する場合、最終更新時刻を取得
            $lastModifiedTimeStr = date("H:i", filemtime($filePath));

            if (calcKoma($lastModifiedTimeStr) < calcKoma($currentTimeStr)) {
                // 最終更新時刻が現在時刻より前のコマの場合、データが更新されているので、再取得する
                return true;
            }
        }

    } elseif ($targetDateStr < $currentDateStr) {
        // $targetDateStr が過去の日付の場合

        if (!file_exists($filePath)) {
            // ファイルが存在しない場合は、取得すべき
            return true;

        } else {
            // ファイルが存在する場合、最終更新時刻を取得
            $lastModifiedDateTimeStr = date("Ymd H:i", filemtime($filePath));

            if ($lastModifiedDateTimeStr < ($targetDateStr . " 23:32")) {
                // 最終更新時刻がその日の23:32以前の場合、すべての時間のデータが揃っていないので、再取得すべき
                return true;
            }
        }
    }

    return false;
}

// クロスオリジン許可
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

// クエリパラメータを取得
$targetArea = isset($_GET['area']) ? $_GET['area'] : null;
$targetDateStr = isset($_GET['date']) ? $_GET['date'] : null;

// エスケープ
$targetArea = htmlspecialchars($targetArea, ENT_QUOTES, 'UTF-8');
$targetDateStr = htmlspecialchars($targetDateStr, ENT_QUOTES, 'UTF-8');

// バリデーション
if (!validateTargetArea($targetArea) || !validateTargetDate($targetDateStr)) {
    http_response_code(400); // 400 Bad Request を設定
    echo "400 Bad Request: パラメータが無効です。targetArea は 1〜10 の整数、date は 8 桁の整数である必要があります。";
    exit;  // ここでスクリプトを終了
}

// リクエストされているファイル
$filePath = createFilePath($targetArea, $targetDateStr);
$fileName = createFileName($targetArea, $targetDateStr);

// 現在日時の取得
$currentDateTime = new DateTime();
// OCCTOサーバへのデータ反映遅れ2分を考慮し、2分前の時刻を計算
$currentDateTime->modify('-2 minutes');
$currentDateStr = $currentDateTime->format('Ymd');
$currentTimeStr = $currentDateTime->format('H:i');

// CSVの更新が必要か判定
$updateRequired = shouldUpdateCSV($targetArea, $targetDateStr, $currentDateStr, $currentTimeStr);

// 更新が必要な場合のみスクレイピングを実施
if ($updateRequired) {
    $ch = curl_init();  // cURLセッションを初期化
    $csvData = scrapingCSV($ch, $targetArea, $targetDateStr);  // スクレイピング実行
    if (!$csvData) {
        http_response_code(500);  // 500 Internal Server Error を設定
        header('Content-Type: text/plain');
        echo "500 Internal Server Error: OCCTOシステムからのファイル取得に失敗しました。";
        curl_close($ch);  // セッションを終了
        exit;  // ここでスクリプトを終了
    }
    file_put_contents($filePath, $csvData); // ファイルを保存
}

// レスポンス
if ($targetDateStr > $currentDateStr) {
    // $targetDateStr が未来の日付の場合、ファイルを返せないので404
    http_response_code(404);
    header('Content-Type: text/plain');
    echo "404 Not Found: 未来の日付は許可されていません。";

} else {
    // $targetDateStr が未来の日付ではない場合、ファイルを返す
    header('Content-Type: text/csv');
    header("Content-Disposition: filename=\"" . $fileName . "\"");
    readfile($filePath);
}
?>
