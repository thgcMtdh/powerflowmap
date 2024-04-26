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
    flows.push({'name': '新古河線',       'amounts': rawdata['新古河線']});
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
    flows.push({'name': '佐久間東幹線(里)', 'amounts': rawdata['佐久間東幹線(里)']});
    flows.push({'name': '鹿島線',           'amounts': rawdata['鹿島線']});
    flows.push({'name': '那珂線',           'amounts': rawdata['那珂線']});
    flows.push({'name': '東京東線',         'amounts': rawdata['東京東線']});
    flows.push({'name': '東京北線',         'amounts': rawdata['東京北線']});
    flows.push({'name': '北葛飾線',         'amounts': rawdata['北葛飾線']});
    flows.push({'name': '河北線',           'amounts': rawdata['河北線']});
    flows.push({'name': '青梅線A',          'amounts': rawdata['青梅線']});
    flows.push({'name': '東京西線A',        'amounts': rawdata['東京西線']});
    flows.push({'name': '港北線(港北～荏田)','amounts': rawdata['港北線']});
    flows.push({'name': '西北線',           'amounts': rawdata['西北線']});
    flows.push({'name': '東新宿線',         'amounts': rawdata['東新宿線']});
    flows.push({'name': '新宿線',           'amounts': rawdata['新宿線']});
    flows.push({'name': '新宿城南線',       'amounts': rawdata['新宿城南線']});
    flows.push({'name': '秦浜線A',          'amounts': rawdata['秦浜線']});
    flows.push({'name': '東京南線1/2L',     'amounts': rawdata['東京南線1/2L']});
    flows.push({'name': '東京南線3/4LA',    'amounts': rawdata['東京南線3/4L']});
    flows.push({'name': '南川崎線',         'amounts': rawdata['南川崎線']});
    flows.push({'name': '京浜線1/2L',       'amounts': rawdata['京浜線1/2L']});
    flows.push({'name': '京浜線3/4LA',      'amounts': rawdata['京浜線3/4L']});
    flows.push({'name': '西南多摩線',       'amounts': rawdata['西南多摩線']});
    flows.push({'name': '中沢線',           'amounts': rawdata['中沢線']});
    flows.push({'name': '南狭山線',         'amounts': rawdata['南狭山線']});
    flows.push({'name': '新座線',           'amounts': rawdata['新座線']});
    flows.push({'name': '北武蔵野線',       'amounts': rawdata['北武蔵野線']});
    flows.push({'name': '水道橋線',         'amounts': rawdata['水道橋線']});
    flows.push({'name': '東新宿水道橋線',   'amounts': rawdata['東新宿水道橋線']});
    flows.push({'name': '坂戸川越線',       'amounts': rawdata['坂戸川越線']});
    flows.push({'name': '西南川越線A',      'amounts': rawdata['西南川越線']});
    flows.push({'name': '東京中線A',        'amounts': rawdata['東京中線']});
    flows.push({'name': '北与野線',         'amounts': rawdata['北与野線']});
    flows.push({'name': '西越谷線',         'amounts': rawdata['西越谷線']});
    flows.push({'name': '春日部線',         'amounts': rawdata['春日部線']});
    flows.push({'name': '豊島線',           'amounts': rawdata['豊島線']});
    flows.push({'name': '東内幸町線',       'amounts': rawdata['東内幸町線']});
    flows.push({'name': '上野線',           'amounts': rawdata['上野線']});
    flows.push({'name': '上野水道橋線',     'amounts': rawdata['上野水道橋線']});
    flows.push({'name': '世田谷線',         'amounts': rawdata['世田谷線']});
    flows.push({'name': '豊洲内幸町線',     'amounts': rawdata['豊洲内幸町線']});
    flows.push({'name': '北千葉線A',        'amounts': rawdata['北千葉線']});
    flows.push({'name': '墨東線A',          'amounts': rawdata['墨東線']});
    
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

    // 新所沢変電所の出入りから、新鶴ヶ島線が求まる
    flows.push({
        'name': '新鶴ヶ島線',
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

    // 西群馬幹線は、途中に揚水や需要があって東山梨以南の正確な値を計算できないので、そのまま返す
    flows.push({'name': '西群馬幹線A', 'amounts': rawdata['西群馬幹線']});

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

    // 新榛名変電所の出入りから、玉原線が求まる
    flows.push({
        'name': '玉原線',
        'amounts': arraySum(
            [rawdata['新吾妻線'], rawdata['新榛名線']],
            [1, 1]
        )
    });

    // 新今市開閉所の出入りから、下郷線;塩原線の和が求まる
    flows.push({
        'name': "下郷線＋塩原線",
        "amounts": arraySum(
            [rawdata['中栃木線'], rawdata['新いわき線']],
            [1, -1]
        )
    })

    // 西群馬開閉所の出入りから、南新潟幹線+新新潟幹線の和が求まる
    flows.push({
        'name': '南新潟幹線＋新新潟幹線',
        'amounts': arraySum(
            [rawdata['西群馬幹線'], rawdata['西上武幹線'], rawdata['新吾妻線'], rawdata['東群馬幹線']],
            [1, 1, -1, -1]
        )
    })

    // 新いわき開閉所の出入りから、福島幹線(山)+福島東幹線(山)+広野火力線の和が求まる
    // 常時開放の予備用東北-東京連系線であるいわき幹線には潮流が流れない前提
    // https://www.occto.or.jp/iinkai/kouikikeitouseibi/2015/files/seibi_10_01.pdf)
    flows.push({
        'name': "福島幹線(山)＋福島東幹線(山)＋広野火力線",
        'amounts': arraySum(
            [rawdata['新いわき線'], rawdata['福島幹線(中)'], rawdata['福島東幹線(里)'], rawdata['川内線']],
            [1, 1, 1, -1]
        )
    })

    return flows;
}
