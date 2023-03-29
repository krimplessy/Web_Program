function countWords(text) {
    let pos = 0, posEnd = 0;;
    let letter = '', letterEnd = '';
    let k = 0;
    let newStr = '';
    while (text.indexOf(' ', pos) >= 0) {
        letter = text[pos];
        posEnd = text.indexOf(' ', pos) - 1;
        letterEnd = text[posEnd];
        newStr = text.slice(pos, posEnd + 1);
        pos = text.indexOf(' ', pos) + 1;
        if (isNaN(newStr)) {
            if (letter == letterEnd) {
                k++
            }
            document.write(`${letter}  --  ${letterEnd} <br>`);
        }
    }
    document.write(`Количество повторяющихся слов, начинающихся и оканчивающихся на одну и ту же букву: ${k}`);
}
let html = 'резких изменений 565 567 курса нон цена может косяк я ';
document.write(`Строка: ${html}<br>`);
countWords(html);