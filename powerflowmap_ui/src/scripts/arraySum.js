/**
 * 
 * @param {*} arrays 加算したい配列を指定. 何個でもよいが、全ての配列の長さは等しくすること.
 *                   例)[ [1, 3, 5], [2, 4, 6] ]
 * @param {*} signs それぞれを足すのか引くのか指定する. 足す場合は1, 引く場合は-1.
 *                  例) [1, -1]
 * @return 加算結果. 要素数の不一致などエラーが生じた場合は null を返す
 *         例) 上記の引数に対する return は、[-1, -1, -1]
 */
export function arraySum(arrays, signs) {
    // 配列と符号の要素数についてエラーチェック
    if (arrays.length !== signs.length) {
        return null;
    }

    // 各配列の要素数の不一致をエラーチェック
    const numelem = arrays[0].length;
    for (let i = 1; i < arrays.length; i++) {
        if (arrays[i].length !== numelem) {
            return null;
        }
    }

    // 計算
    let sum = Array(numelem).fill(0);
    for (let i = 0; i < arrays.length; i++) {
        for (let j = 0; j < numelem; j++) {
            sum[j] += signs[i] * arrays[i][j];
        }
    }

    return sum;
}