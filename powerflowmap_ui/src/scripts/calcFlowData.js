import { calcFlowDataTokyo } from "./calcFlowDataTokyo";

/**
 * 指定されたエリアの潮流実績ファイルを基に、各送電線の潮流を計算してobjectで返す
 * @param {string} area エリア. 現時点では'tokyo'のみ対応
 * @param {string} csv OCCTOからダウンロードした、当該エリアの潮流実績を記したCSVテキスト
 * @returns 各送電線の潮流を表すオブジェクトが入った配列.
 *          送電線名と潮流実績を以下の例のように表す.
 *          潮流実績は48コマで固定. 計測値の無い時間帯は0埋めされる.
 *          例) [
 *                  {'name': '川内線', 'amounts': [200, 300, 250, ...] },
 *                  {'name': '南いわき幹線', 'amounts': [300, 400, 300, ...] }
 *              ]
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