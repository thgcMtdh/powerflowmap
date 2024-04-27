import { calcFlowDataTokyo } from "./calcFlowDataTokyo";

/**
 * 指定されたエリアの潮流実績ファイルを基に、各送電線の潮流を計算して返す
 * @param {string} area エリア. 現時点では'tokyo'のみ対応
 * @param {string} csv OCCTOからダウンロードした、当該エリアの潮流実績を記したCSVテキスト
 * @returns 送電線名をkey、潮流実績(48コマの1次元配列)をvalueとするオブジェクト.
 *          実績値がない場合は0で埋められている.
 *          例) { '新筑波線': [200, 300, ...], '新佐原線': [400, 300, ...] }
 */
export function calcFlowData(area, csv) {
    if (!csv) {
        return null;
    }
    if (area == 'tokyo') {
        return calcFlowDataTokyo(csv);
    }
    return null;
}