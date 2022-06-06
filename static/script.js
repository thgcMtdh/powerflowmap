/**
 * サーバから送電線データを受信し、それを基に送電線地図の太さと色を調整する
 * @param {HTMLElement} svg #mapsvg element
 */
function setLineDesign(svg) {
    const color = '#919195';
    $.get('/line', function(lines){
        if (lines) {
            const paths = $(svg).find('path');
            for (var i = 0; i < paths.length; i++) {
                const label = paths[i].getAttribute('inkscape:label');  // 各pathのinkscape:label属性値を取得
                if (label) {
                    const line = lines.find(line => line['label'] === label);  // サーバから受信した送電線データの中から、当該labelをもつ要素を取得
                    if (line) {
                        const strokeWidth = line['capacity'] / 250.0;  // 送電線の運用容量に応じて線の太さを変更
                        paths[i].setAttribute('style',
                            `fill:none; stroke:${color}; stroke-width:${strokeWidth};`
                        );
                    }
                }
            }
        }
    })
}

/**
 * 
 * @param {HTMLElement} svg #mapsvg element
 * @param {Array} flows 各送電線の潮流データ
 */
function paintFlow(svg, flows) {

}

window.onload = function() {
    const mapsvg_wrapper = document.getElementById('mapsvg_wrapper');
    const mapsvg = mapsvg_wrapper.contentDocument.getElementById('mapsvg');
    setLineDesign(mapsvg);
    const flows = {'minamiiwaki': 2000};
    paintFlow(mapsvg, flows);
}