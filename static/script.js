/**
 * 要素定義
 */

/**
 * @brief 変電所・開閉所などの電気所(node)を格納する
 * @description node のプロパティは以下の通り:
 *     type: "SS" | "SWS",  // SS=変電所,SWS=開閉所
 *     id_bulk: string,     // 基幹系統csvにおける変電所No(開閉所の場合はNoではなく名前にする)
 *     name: string,        // 名前
 *     pos: {
 *         x: number,       // 表示位置x [px]
 *         y: number        // 表示位置y [px]
 *     }
 *     id_local: string,    // 地域供給系統csvにおける変電所No
 *     cap_bulk: number,    // 基幹系統の変圧器運用容量合計[MW]
 *     cap_local: number,   // 地域供給系統の変圧器運用容量合計[MW]
 */
const nodes = [];
nodes.push({type: 'SWS', id_bulk: 'kikan-275-shiniwaki', name: '新いわき', pos: {x: 900, y:0}});
nodes.push({type: 'SS', id_bulk: 'kikan-275-002', name: '新茂木', pos: {x: 900, y:0}});
nodes.push({type: 'SS', id_bulk: 'kikan-275-003', name: '新栃木', pos: {x: 900, y:0}});

/**
 * @brief 電気所どうしを接続する送電線(line)を格納する
 * @description line のプロパティは以下の通り:
 *     id_bulk: string,  // 基幹系統csvにおける送電線No
 *     name: string,     // 送電線名
 *     voltage: number,  // 電圧[kV]
 *     cap: number,      // 運用容量[MW]
 *     from: string,     // 起点電気所id
 *     to: string        // 終点電気所id
 */
const lines = [];
lines.push({id_bulk: 'kikan-500-004', name: '福島幹線(中)', voltage: 500, cap: 3291, from: 'kikan-275-shiniwaki', to: 'kikan-275-002'});
lines.push({id_bulk: 'kikan-500-010', name: '新茂木線', voltage: 500, cap: 6582, from: 'kikan-275-002', to: 'kikan-275-003'});


/**
 * @brief SVG生成
 */
function createSVG() {
    // SVGを生成
    const svg = document.createElementNS('https://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '1024');
    svg.setAttribute('height', '768');
    svg.setAttribute('viewBox', '0 0 1024 768');
    svg.setAttribute('preserveAspectRatio', 'none');
    svg.setAttribute('style', 'background-color:#eae9e6;')
    // 送電線描画
    for (const line of lines) {
        console.log(line.name);
    }

    const line = document.createElementNS('https://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1',20);
    line.setAttribute('y1',20);
    line.setAttribute('x2',180);
    line.setAttribute('y2',180);
    line.setAttribute('stroke', '#008080');
    line.setAttribute('stroke-width', 5);

    //svgに追加
    svg.appendChild( line );

    const p = document.createElement('p');
    p.innerText = 'てすと';

    // svgをページに追加
    document.getElementById('container').appendChild(svg);
    document.getElementById('container').appendChild(p);
}

/**
 * 読み込み完了時に実行する処理
 */
// $(function() {
//     // createSVG();
// });
window.onload = function() {
    createSVG();

}