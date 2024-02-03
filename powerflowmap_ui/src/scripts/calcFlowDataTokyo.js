import { arraySum } from './arraySum';
import { convertCsvToDict } from './convertCsvToDict'

/**
 * 東京エリアの送電実績を計算する
 * @param {string} csv OCCTOからダウンロードした、東京エリアの潮流実績を記したCSVテキスト
 * @returns json形式で扱いやすくした潮流実績(flow)
 */
export function calcFlowDataTokyo(csv) {
    if (!csv) {
        return null;
    }
    const rawdata = convertCsvToDict(csv);

    const flows = [];

    // 値をそのまま転記できるものを埋める
    // 500kV
    flows.push({'name': '川内線',         'amounts': rawdata['川内線']});
    flows.push({'name': '南いわき幹線',   'amounts': rawdata['南いわき幹線']});
    flows.push({'name': '新いわき線',     'amounts': rawdata['新いわき線']});
    flows.push({'name': '福島幹線(中)',   'amounts': rawdata['福島幹線(中)']});
    flows.push({'name': '福島東幹線(里)', 'amounts': rawdata['福島東幹線(里)']});
    flows.push({'name': '新茂木線',       'amounts': rawdata['新茂木線']});
    flows.push({'name': '福島幹線(里)',   'amounts': rawdata['福島幹線(里)']});
    flows.push({'name': '中栃木線',       'amounts': rawdata['中栃木線']});
    flows.push({'name': '新栃木線',       'amounts': rawdata['新栃木線']});
    flows.push({'name': '新袖ヶ浦線',     'amounts': rawdata['新袖ヶ浦線']});
    flows.push({'name': '房総線',         'amounts': rawdata['房総線']});
    flows.push({'name': '印旛線',         'amounts': rawdata['印旛線']});
    flows.push({'name': '新佐原線',       'amounts': rawdata['新佐原線']});
    flows.push({'name': '新筑波線',       'amounts': rawdata['新筑波線']});
    flows.push({'name': '東群馬幹線',     'amounts': rawdata['東群馬幹線']});
    flows.push({'name': '新赤城線',       'amounts': rawdata['新赤城線']});
    flows.push({'name': '新新田線',       'amounts': rawdata['新新田線']});
    flows.push({'name': '新坂戸線',       'amounts': rawdata['新坂戸線']});
    flows.push({'name': '新岡部線',       'amounts': rawdata['新岡部線']});
    flows.push({'name': '新吾妻線',       'amounts': rawdata['新吾妻線']});
    flows.push({'name': '西上武幹線',     'amounts': rawdata['西上武幹線']});
    flows.push({'name': '新榛名線',       'amounts': rawdata['新榛名線']});
    flows.push({'name': '新秦野線',       'amounts': rawdata['新秦野線']});
    flows.push({'name': '新多摩線',       'amounts': rawdata['新多摩線']});
    flows.push({'name': '新秩父線',       'amounts': rawdata['新秩父線']});
    flows.push({'name': '新豊洲線',       'amounts': rawdata['新豊洲線']});
    // 275kV
    flows.push({'name': '君津線',           'amounts': rawdata['君津線']});
    flows.push({'name': '香取線',           'amounts': rawdata['香取線']});
    flows.push({'name': '佐久間東幹線(中)', 'amounts': rawdata['佐久間東幹線(中)']});
    flows.push({'name': '鹿島線',           'amounts': rawdata['鹿島線']});
    flows.push({'name': '那珂線',           'amounts': rawdata['那珂線']});
    
    // 計算が必要な送電線について追記

    // 新古河変電所の出入りから、新京葉線Bが求まる
    flows.push({'name': '新京葉線A', 'amounts': rawdata['新京葉線']});
    flows.push({
        'name': '新京葉線B',
        'amounts': arraySum(
            [rawdata['新古河線'], rawdata['河北線'], rawdata['新筑波線'], rawdata['福島幹線(里)']],
            [1, 1, -1, -1]
        )
    });

    // 新所沢変電所の出入りから、新古河線Bが求まる
    flows.push({'name': '新古河線A', 'amounts': rawdata['新古河線']});
    flows.push({
        'name': '新古河線B',
        'amounts': arraySum(
            [rawdata['新古河線'], rawdata['西上武幹線'], rawdata['新所沢線'], rawdata['中沢線'], rawdata['南狭山線']],
            [1, 1, -1, -1, -1]
        )
    });

    // 新飯能変電所の出入りから、新所沢線Bが求まる
    flows.push({'name': '新所沢線A', 'amounts': rawdata['新所沢線']});
    flows.push({
        'name': '新所沢線B',
        'amounts': arraySum(
            [rawdata['新所沢線'], rawdata['青梅線']],
            [1, -1]
        )
    });

    // 西群馬幹線は、途中に揚水や需要があって正確な値を計算できないので、そのまま返す
    flows.push({'name': '西群馬幹線A', 'amounts': rawdata['西群馬幹線']});
    flows.push({'name': '西群馬幹線B', 'amounts': rawdata['西群馬幹線']});

    // 新秩父開閉所の出入りから、安曇幹線が求まる
    flows.push({
        'name': '安曇幹線',
        'amounts': arraySum(
            [rawdata['新秩父線'], rawdata['新岡部線'], rawdata['新榛名線']],
            [1 , -1, -1]
        )
    });

    // 南いわき開閉所の出入りから、相馬双葉幹線が求まる
    flows.push({
        'name': '相馬双葉幹線',
        'amounts': arraySum(
            [rawdata['川内線'], rawdata['南いわき幹線']],
            [1, 1]
        )
    });

    return flows;
}
