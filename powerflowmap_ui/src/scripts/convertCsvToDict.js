/**
 * OCCTOからダウンロードしたCSV形式のデータをkey-value objectに変換する
 * @param {string} csv CSV形式の潮流実績データ
 * @returns 送電線名をkey、潮流実績(48コマの1次元配列)をvalueとするオブジェクト.
 *          実績値がない場合は0で埋められている.
 *          例) { '新筑波線': [200, 300, ...], '新佐原線': [400, 300, ...] }
 */
export function convertCsvToDict(csv) {
    const lines = csv.split('\n');
    let result = {};

    for (let i = 1; i < lines.length; i++) {
        const currentLine = lines[i].split(',');

        // 潮流実績CSVファイルは列が53列あるはず。
        // そうでなければ空行なので、以降の処理を行わない
        if (currentLine.length !== 53) {
            continue;
        }

        const name = currentLine[3].trim();
        result[name] = Array(48);

        // 数値を転記
        for (let j = 0; j < 48; j++) {
            result[name][j] = parseInt(currentLine[j + 5].trim());
        }
    }
    return result;
}