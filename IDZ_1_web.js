let n = prompt('Введите количство нулей и единиц, n =  ');
if (isNaN(n) || !isFinite(n) || (n <= 0) || !Number.isInteger(Number(n))) {
    alert(`Ошибочное число: ${n}`); 
} else {
    let stroke = '';
    let k_curr = 0, k_big = 0, k = 0;
    let tmp;
    let num = Math.random();
    for (let i=1; i<=n; i++) {
        stroke += Math.round(num);
        if (Math.round(num) == 0) {
            k += 1;
            k_curr = k;
            if (k_curr > k_big) {
                k_big = k_curr;
            } 
        } else {
            k = 0;
        }
        num = Math.random();
    }
    document.write(`Последовательность: ${stroke} <br>`);
    document.write(`Наибольшее число идущих подряд нулей: ${k_big}`);
}