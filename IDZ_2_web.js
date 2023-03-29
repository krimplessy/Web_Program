let n = prompt('n = ');
if (isNaN(n) || !isFinite(n) || (n <= 2) || !Number.isInteger(Number(n)) || (n >= 15)) {
    alert(`Ошибочное число: ${n}`); 
} else {
    /*for (let i = 100; i >= n; i -= 100/n) {
        document.write(`<hr width=${i}%>`);
    }*/
    for (let i = 1; i <= n; i++) {
        document.write(`<hr width=${100/i}%>`);
    }
    document.write(`<table>`);
    let tmp = 0;
    for (let i = 0; i < n; i++) {
        document.write(`<tr>`);
        if (i % 2 == 0) {
            for (let j = 0; j < n; j++) {
                if (j >= tmp && j < n - tmp) {
                    document.write(`<td class="black"></td>`);
                } else {
                    document.write(`<td class="white"></td>`);
                }
            }
            tmp++;
        } else {
            for (let j = 0; j < n; j++) {
                document.write(`<td class="white"></td>`);
            }
        }
        document.write(`</tr>`);
    }
    document.write(`</table>`);
    for (let i = n; i > 0; i--) {
        document.write(`<hr width=${100/i}%>`);
    }
}