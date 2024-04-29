import { arraySum } from './arraySum';
import { convertCsvToDict } from './convertCsvToDict'

/**
 * 東京エリアのCSVデータを基に、描画用の潮流実績を計算する
 * @param {string} csv OCCTOからダウンロードした、東京エリアの潮流実績を記したCSVテキスト
 * @returns 送電線名をkey、潮流実績(48コマの1次元配列)をvalueとするオブジェクト.
 *          実績値がない場合は0で埋められている.
 *          例) { '新筑波線': [200, 300, ...], '新佐原線': [400, 300, ...] }
 */
export function calcFlowDataTokyo(csv) {
    if (!csv) {
        return null;
    }
    const rawdata = convertCsvToDict(csv);

    const flowData = {};

    // 値をそのまま転記できるものを埋める
    // 500kV
    flowData['川内線'] = rawdata['川内線'];
    flowData['川内線'] = rawdata['川内線'];
    flowData['南いわき幹線'] = rawdata['南いわき幹線'];
    flowData['新いわき線'] = rawdata['新いわき線'];
    flowData['福島幹線(中)'] = rawdata['福島幹線(中)'];
    flowData['福島東幹線(里)'] = rawdata['福島東幹線(里)'];
    flowData['新茂木線'] = rawdata['新茂木線'];
    flowData['福島幹線(里)'] = rawdata['福島幹線(里)'];
    flowData['中栃木線'] = rawdata['中栃木線'];
    flowData['新栃木線'] = rawdata['新栃木線'];
    flowData['新袖ヶ浦線'] = rawdata['新袖ヶ浦線'];
    flowData['房総線'] = rawdata['房総線'];
    flowData['印旛線'] = rawdata['印旛線'];
    flowData['新佐原線'] = rawdata['新佐原線'];
    flowData['新筑波線'] = rawdata['新筑波線'];
    flowData['新古河線'] = rawdata['新古河線'];
    flowData['東群馬幹線'] = rawdata['東群馬幹線'];
    flowData['新赤城線'] = rawdata['新赤城線'];
    flowData['新新田線'] = rawdata['新新田線'];
    flowData['新坂戸線'] = rawdata['新坂戸線'];
    flowData['新岡部線'] = rawdata['新岡部線'];
    flowData['新吾妻線'] = rawdata['新吾妻線'];
    flowData['西上武幹線'] = rawdata['西上武幹線'];
    flowData['新榛名線'] = rawdata['新榛名線'];
    flowData['新秦野線'] = rawdata['新秦野線'];
    flowData['新多摩線'] = rawdata['新多摩線'];
    flowData['新秩父線'] = rawdata['新秩父線'];
    flowData['新豊洲線'] = rawdata['新豊洲線'];
    // 275kV
    flowData['河北線'] = rawdata['河北線'];
    flowData['葛南世田谷線'] = rawdata['葛南世田谷線'];
    flowData['京浜線1/2L'] = rawdata['京浜線1/2L'];
    flowData['京浜線3/4LA'] = rawdata['京浜線3/4L'];
    flowData['君津線'] = rawdata['君津線'];
    flowData['江東線A'] = rawdata['江東線'];
    flowData['港北線(港北～荏田)'] = rawdata['港北線'];
    flowData['香取線'] = rawdata['香取線'];
    flowData['高輪線'] = rawdata['高輪線'];
    flowData['佐久間東幹線(中)'] = rawdata['佐久間東幹線(中)'];
    flowData['佐久間東幹線(里)'] = rawdata['佐久間東幹線(里)'];
    flowData['坂戸川越線'] = rawdata['坂戸川越線'];
    flowData['児玉線'] = rawdata['児玉線'];
    flowData['鹿島線'] = rawdata['鹿島線'];
    flowData['春日部線'] = rawdata['春日部線'];
    flowData['上野水道橋線'] = rawdata['上野水道橋線'];
    flowData['上野線'] = rawdata['上野線'];
    flowData['城南線'] = rawdata['城南線'];
    flowData['新座線'] = rawdata['新座線'];
    flowData['新宿城南線'] = rawdata['新宿城南線'];
    flowData['新宿線'] = rawdata['新宿線'];
    flowData['秦浜線A'] = rawdata['秦浜線'];
    flowData['水道橋線'] = rawdata['水道橋線'];
    flowData['世田谷線'] = rawdata['世田谷線'];
    flowData['西越谷線'] = rawdata['西越谷線'];
    flowData['西南川越線A'] = rawdata['西南川越線'];
    flowData['西南多摩線'] = rawdata['西南多摩線'];
    flowData['西北線'] = rawdata['西北線'];
    flowData['青梅線A'] = rawdata['青梅線'];
    flowData['中沢線'] = rawdata['中沢線'];
    flowData['東京西線A'] = rawdata['東京西線'];
    flowData['東京中線A'] = rawdata['東京中線'];
    flowData['東京東線'] = rawdata['東京東線'];
    flowData['東京南線1/2L'] = rawdata['東京南線1/2L'];
    flowData['東京南線3/4LA'] = rawdata['東京南線3/4L'];
    flowData['東京北線'] = rawdata['東京北線'];
    flowData['東新宿水道橋線'] = rawdata['東新宿水道橋線'];
    flowData['東新宿線'] = rawdata['東新宿線'];
    flowData['東内幸町線'] = rawdata['東内幸町線'];
    flowData['東毛線'] = rawdata['東毛線'];
    flowData['那珂線'] = rawdata['那珂線'];
    flowData['南狭山線'] = rawdata['南狭山線'];
    flowData['南川崎線'] = rawdata['南川崎線'];
    flowData['南池上線'] = rawdata['南池上線'];
    flowData['豊洲永代橋線'] = rawdata['豊洲永代橋線'];
    flowData['豊洲内幸町線'] = rawdata['豊洲内幸町線'];
    flowData['豊島線'] = rawdata['豊島線'];
    flowData['北葛飾線'] = rawdata['北葛飾線'];
    flowData['北熊谷線'] = rawdata['北熊谷線'];
    flowData['北千葉線A'] = rawdata['北千葉線'];
    flowData['北武蔵野線'] = rawdata['北武蔵野線'];
    flowData['北与野線'] = rawdata['北与野線'];
    flowData['墨東線A'] = rawdata['墨東線'];
    
    // 計算が必要な送電線について追記

    // 新古河変電所の出入りから、新京葉線Bが求まる
    flowData['新京葉線A'] = rawdata['新京葉線'];
    flowData['新京葉線B'] = arraySum(
        [rawdata['新古河線'], rawdata['河北線'], rawdata['新筑波線'], rawdata['福島幹線(里)']],
        [1, 1, -1, -1]
    );

    // 新所沢変電所の出入りから、新鶴ヶ島線が求まる
    flowData['新鶴ヶ島線'] = arraySum(
        [rawdata['新古河線'], rawdata['西上武幹線'], rawdata['新所沢線'], rawdata['中沢線'], rawdata['南狭山線']],
        [1, 1, -1, -1, -1]
    );

    // 新飯能変電所の出入りから、新所沢線Bが求まる
    flowData['新所沢線A'] = rawdata['新所沢線'];
    flowData['新所沢線B'] = arraySum(
        [rawdata['新所沢線'], rawdata['青梅線']],
        [1, -1]
    );

    // 西群馬幹線は、途中に揚水や需要があって神流川以南の正確な値を計算できないので、そのまま返す
    flowData['西群馬幹線A'] = rawdata['西群馬幹線'];

    // 新秩父開閉所の出入りから、安曇幹線が求まる
    flowData['安曇幹線'] = arraySum(
        [rawdata['新秩父線'], rawdata['新岡部線'], rawdata['新榛名線']],
        [1 , -1, -1]
    );

    // 南いわき開閉所の出入りから、相馬双葉幹線が求まる
    flowData['相馬双葉幹線'] = arraySum(
        [rawdata['川内線'], rawdata['南いわき幹線']],
        [1, 1]
    );

    // 新榛名変電所の出入りから、玉原線が求まる
    flowData['玉原線'] = arraySum(
        [rawdata['新吾妻線'], rawdata['新榛名線']],
        [1, 1]
    );

    // 新今市開閉所の出入りから、下郷線;塩原線の和が求まる
    flowData['下郷線＋塩原線'] = arraySum(
        [rawdata['中栃木線'], rawdata['新いわき線']],
        [1, -1]
    );

    // 西群馬開閉所の出入りから、南新潟幹線+新新潟幹線の和が求まる
    flowData['南新潟幹線＋新新潟幹線'] = arraySum(
        [rawdata['西群馬幹線'], rawdata['西上武幹線'], rawdata['新吾妻線'], rawdata['東群馬幹線']],
        [1, 1, -1, -1]
    );

    // 新いわき開閉所の出入りから、福島幹線(山)+福島東幹線(山)+広野火力線の和が求まる
    // 常時開放の予備用東北-東京連系線であるいわき幹線には潮流が流れない前提
    // https://www.occto.or.jp/iinkai/kouikikeitouseibi/2015/files/seibi_10_01.pdf)
    flowData['福島幹線(山)＋福島東幹線(山)＋広野火力線'] =  arraySum(
        [rawdata['新いわき線'], rawdata['福島幹線(中)'], rawdata['福島東幹線(里)'], rawdata['川内線']],
        [1, 1, 1, -1]
    );

    return flowData;
}
