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
    flowData['西谷門司線B'] = arraySum(
        [rawdata['西谷門司線'], rawdata['苅田分岐線']],
        [1, 1]
    );
    flowData['苅田分岐線'] = rawdata['苅田分岐線'];
    flowData['槻田線'] = rawdata['槻　田　線'];
    flowData['到津線'] = rawdata['到　津　線'];
    flowData['西谷線'] = rawdata['西　谷　線'];
    flowData['上津役線'] = rawdata['上津役線'];
    flowData['北九州豊前線'] = rawdata['北九州豊前線'];
    flowData['古賀分岐線'] = rawdata['古賀分岐線'];
    flowData['北九州東福岡線A'] = rawdata['北九州東福岡線'];
    flowData['北九州東福岡線B'] = arraySum(
        [rawdata['北九州東福岡線'], rawdata['古賀分岐線']],
        [1, 1]
    );
    flowData['筑豊線'] = rawdata['筑　豊　線'];
    flowData['東福岡住吉線'] = rawdata['東福岡住吉線'];
    flowData['中央南福岡線'] = rawdata['中央南福岡線'];
    flowData['脊振伊都線'] = rawdata['脊振伊都線'];
    flowData['大分北線A'] = rawdata['大分北　線'];
    flowData['大分北線B'] = arraySum(
        [rawdata['大分北　線'], rawdata['速見分岐線']],
        [1, 1]
    );
    flowData['速見分岐線'] = rawdata['速見分岐線'];
    flowData['山家線'] = rawdata['山　家　線'];
    flowData['山家東福岡線'] = rawdata['山家東福岡線'];
    flowData['脊振鳥栖線'] = rawdata['脊振鳥栖線'];
    flowData['鳥栖木佐木線A'] = rawdata['鳥栖木佐木線'];
    flowData['鳥栖木佐木線B'] = arraySum(
        [rawdata['鳥栖木佐木線'], rawdata['久留米分岐線']],
        [1, 1]
    );
    flowData['久留米分岐線'] = rawdata['久留米分岐線'];
    flowData['北佐賀木佐木線'] = rawdata['北佐賀木佐木線'];
    flowData['木佐木三池線'] = rawdata['木佐木三池線'];
    flowData['東大分線'] = rawdata['東大分　線'];
    flowData['海崎線A'] = rawdata['海　崎　線'];
    flowData['大分南線'] = rawdata['大分南　線'];
    flowData['熊本日田線'] = rawdata['熊本日田線'];
    flowData['唐津西九州線'] = rawdata['唐津西九州線'];
    flowData['西九州北佐賀線A'] = rawdata['西九州北佐賀線'];
    flowData['西九州武雄線'] = rawdata['武　雄　線'];
    flowData['西佐世保武雄線A'] = rawdata['西佐世保武雄線'];
    flowData['西佐世保武雄線B'] = arraySum(
        [rawdata['西佐世保武雄線'], rawdata['東佐世保分岐線']],
        [1, 1]
    );
    flowData['東佐世保分岐線'] = rawdata['東佐世保分岐線'];
    flowData['長崎幹線A'] = rawdata['長　崎　幹線'];
    flowData['長崎幹線B'] = arraySum(
        [rawdata['長　崎　幹線'], rawdata['諫早分岐線']],
        [1, 1]
    );
    flowData['松島火力線北線'] = rawdata['松島火力線北線'];
    flowData['北長崎線'] = rawdata['北長崎分岐線'];
    flowData['諫早分岐線'] = rawdata['諫早分岐線'];
    flowData['熊本三池線A'] = rawdata['熊本三池線'];
    flowData['熊本三池線B'] = arraySum(
        [rawdata['熊本三池線'], rawdata['北熊本分岐線']],
        [1, 1]
    );
    flowData['北熊本分岐線'] = rawdata['北熊本分岐線'];
    flowData['熊本南熊本線A'] = rawdata['熊本南熊本線'];
    flowData['熊本南熊本線B'] = arraySum(
        [rawdata['熊本南熊本線'], rawdata['弓削分岐線']],
        [1, 1]
    );
    flowData['弓削分岐線'] = rawdata['弓削分岐線'];
    flowData['熊本上椎葉線'] = rawdata['熊本上椎葉線'];
    flowData['中九州南熊本線'] = rawdata['中九州南熊本線'];
    flowData['中九州大平線A'] = rawdata['中九州大平線'];
    flowData['中九州大平線B'] = arraySum(
        [rawdata['中九州大平線'], rawdata['八代分岐線']],
        [1, 1]
    );
    flowData['八代分岐線'] = rawdata['八代分岐線'];
    flowData['大平人吉線'] = rawdata['大平人吉線'];
    flowData['大平揚水線'] = arraySum(
        [rawdata['大平人吉線'], rawdata['中九州大平線']],
        [-1, 1]
    );
    flowData['新日向分岐線'] = rawdata['ひむか新日向線'];
    flowData['上椎葉新日向線'] = rawdata['上椎葉新日向線'];
    flowData['一ツ瀬柏田線'] = rawdata['一ッ瀬柏田線'];
    flowData['ひむか一ツ瀬線A'] = rawdata['ひむか一ッ瀬線'];
    flowData['ひむか一ツ瀬線B'] = arraySum(
        [rawdata['ひむか一ッ瀬線'], rawdata['ひむか新日向線']],
        [1, -1]
    );
    flowData['南宮崎線A'] = rawdata['南宮崎　線'];
    flowData['南宮崎線B'] = arraySum(
        [rawdata['南宮崎　線'], rawdata['宮崎分岐線']],
        [1, -1]
    );
    flowData['宮崎分岐線'] = rawdata['宮崎分岐線'];

    return flowData;
}
