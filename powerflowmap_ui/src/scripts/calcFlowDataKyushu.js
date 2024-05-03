import { arraySum } from './arraySum';
import { convertCsvToDict } from './convertCsvToDict'

/**
 * 九州エリアのCSVデータを基に、描画用の潮流実績を計算する
 * @param {string} csv OCCTOからダウンロードした、東京エリアの潮流実績を記したCSVテキスト
 * @returns 送電線名をkey、潮流実績(48コマの1次元配列)をvalueとするオブジェクト.
 *          実績値がない場合は0で埋められている.
 *          例) { '新筑波線': [200, 300, ...], '新佐原線': [400, 300, ...] }
 */
export function calcFlowDataKyushu(csv) {
    if (!csv) {
        return null;
    }
    const rawdata = convertCsvToDict(csv);

    const flowData = {};

    // 値をそのまま転記できるものを埋める
    // 500kV
    flowData['北九州幹線'] = rawdata['北九州幹線'];
    flowData['豊前北幹線'] = rawdata['豊前北幹線'];
    flowData['豊前西幹線'] = rawdata['豊前西幹線'];
    flowData['東九州幹線'] = rawdata['東九州幹線'];
    flowData['熊本幹線'] = rawdata['熊本幹線'];
    flowData['脊振幹線'] = rawdata['脊振幹線'];
    flowData['佐賀幹線'] = rawdata['佐賀幹線'];
    flowData['玄海幹線２Ｌ南線'] = rawdata['玄海幹線２Ｌ南線'];
    flowData['中九州幹線'] = rawdata['中九州幹線'];
    flowData['南九州幹線'] = rawdata['南九州幹線'];
    flowData['日向幹線'] = rawdata['日向幹線'];
    flowData['宮崎幹線'] = rawdata['宮崎幹線'];

    // 220kV
    flowData['西谷門司線A'] = rawdata['西谷門司線'];
    flowData['苅田分岐線'] = rawdata['苅田分岐線'];
    flowData['槻田線'] = rawdata['槻　田　線'];
    flowData['到津線'] = rawdata['到　津　線'];
    flowData['西谷線'] = rawdata['西　谷　線'];
    flowData['上津役線'] = rawdata['上津役線'];
    flowData['北九州豊前線'] = rawdata['北九州豊前線'];
    flowData['古賀分岐線'] = rawdata['古賀分岐線'];
    flowData['北九州東福岡線'] = rawdata['北九州東福岡線'];
    flowData['筑豊線'] = rawdata['筑　豊　線'];
    flowData['東福岡住吉線'] = rawdata['東福岡住吉線'];
    flowData['中央南福岡線'] = rawdata['中央南福岡線'];
    flowData['脊振伊都線'] = rawdata['脊振伊都線'];

    // 計算が必要な送電線
    flowData['西谷門司線B'] = arraySum(
        [rawdata['西谷門司線'], rawdata['苅田分岐線']],
        [1, 1]
    )
    
    return flowData;
}
