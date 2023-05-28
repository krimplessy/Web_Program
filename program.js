let filter = document.getElementById('Filter');
let sort = document.getElementById('Sort');
let clean = document.getElementById('Clean');

filter.onclick = function () {
    let table = document.getElementById('table');

    //Фильтр по категории
    let filterCateg = document.getElementsByClassName('filtCateg');
    let arrCateg = ['Стрижки','Укладки','Текстурирование',
    'Восстановление и уход','HONMA TOKYO','Однотонное окрашивание',
    'Двухцветное окрашивание', 'Классическое мелирование'];
    let arrCateg1 = [];
    for (let i in filterCateg) {
        if (filterCateg[i].checked == true) {
            arrCateg1.push(arrCateg[filterCateg[i].value]);
            //filterCateg[i].checked = false;
        }
    }
    
    for (let i = 1; i < table.rows.length; i++) {
        let row = table.rows[i];
        if (row.hidden == false) {
            for (let tmp of arrCateg1) {
                if (tmp === row.cells[0].innerHTML) {
                    row.hidden = false;
                    break;
                } else {
                    row.hidden = true;
                }
            }
        }
    }

    //Фильтр по гендеру
    let arrMan = ['Виталий','Петр','Михаил','Любой мастер'];
    let arrWoman = ['Инга','Василиса','Александра','Мария','Ангелина',
    'Марина','Валентина','Софья','Маргарита','Юлия','Анастасия','Милана',
    'Ольга','Светлана','Олеся','Жасмин','Диана','Любой мастер'];
    if (document.getElementById('filtGender').value == '0') {
        for (let i = 1; i < table.rows.length; i++) {
            let row = table.rows[i];
            if (row.hidden == false) {
                for (let tmp of arrMan) {
                    if (tmp === row.cells[3].innerHTML) {
                        row.hidden = false;
                        break;
                    } else {
                        row.hidden = true;
                    }
                }
            }
        }
    } else if (document.getElementById('filtGender').value == '1') {
        for (let i = 1; i < table.rows.length; i++) {
            let row = table.rows[i];
            if (row.hidden == false) {
                for (let tmp of arrWoman) {
                    if (tmp === row.cells[3].innerHTML) {
                        row.hidden = false;
                        break;
                    } else {
                        row.hidden = true;
                    }
                }
            }
        }
    }

    //Фильтр по минимальной и максимальной стоимости
    if (document.getElementById('minPrice').value > 2500) {
        document.getElementById('minPrice').value = 2500;
    } else if (document.getElementById('minPrice').value < 100) {
        document.getElementById('minPrice').value = 100;
    }
    if (document.getElementById('maxPrice').value < 2500) {
        document.getElementById('maxPrice').value = 2500;
    } else if (document.getElementById('maxPrice').value > 5950) {
        document.getElementById('maxPrice').value = 5950;
    }
    for (let i = 1; i < table.rows.length; i++) {
        let row = table.rows[i];
        if (row.hidden == false) {
            if (Number(row.cells[2].innerHTML) >= Number(document.getElementById('minPrice').value) &&
            Number(row.cells[2].innerHTML) <= Number(document.getElementById('maxPrice').value)) {
                row.hidden = false;
            } else {
                row.hidden = true;
            }
        }
    }
}

//Ставлю фильтр на то, чтобы поля для сортировки не повторялись
let hideFieldForSort1 = document.getElementById('SortFirst');
let hideFieldForSort2 = document.getElementById('SortSecond');
hideFieldForSort1.onchange = function () {
    if (document.getElementById('SortSecond').value === document.getElementById('SortFirst').value) {
        document.getElementById('SortFirst').value = '5';
    }
}
hideFieldForSort2.onchange = function () {
    if (document.getElementById('SortSecond').value === document.getElementById('SortFirst').value) {
        document.getElementById('SortSecond').value = '5';
    }
}

//Сортировка
sort.onclick = function() {
    let table = document.getElementById('table');

    // Сортируется, если выбрано одно поле для сортировки (первое)
    if (document.getElementById('SortFirst').value !== '5' && document.getElementById('SortSecond').value == '5') {
        if (document.getElementById('SortFirst').value === '0' || document.getElementById('SortFirst').value === '1' || document.getElementById('SortFirst').value === '3') {
            for (let i = 1; i < table.rows.length; i++) {
                let numField = Number(document.getElementById('SortFirst').value);
                for (let j = 1; j < table.rows.length - i; j++) {
                    if (document.getElementById('Sort1').value === '0') { // Сортировка по возрастанию
                        if (table.rows[j].cells[numField].innerHTML > table.rows[j + 1].cells[numField].innerHTML) {
                            table.rows[j].before(table.rows[j + 1]);
                        }
                    } else if (document.getElementById('Sort1').value === '1') { // Сортировка по убыванию
                        if (table.rows[j].cells[numField].innerHTML < table.rows[j + 1].cells[numField].innerHTML) {
                            table.rows[j].before(table.rows[j + 1]);
                        }
                    }
                }
            }
        } else {
            for (let i = 1; i < table.rows.length; i++) {
                let numField = Number(document.getElementById('SortFirst').value);
                for (let j = 1; j < table.rows.length - i; j++) {
                    if (document.getElementById('Sort1').value === '0') { // Сортировка по возрастанию
                        if (Number(table.rows[j].cells[numField].innerHTML) > Number(table.rows[j + 1].cells[numField].innerHTML)) {
                            table.rows[j].before(table.rows[j + 1]);
                        }
                    } else if (document.getElementById('Sort1').value === '1') { // Сортировка по убыванию
                        if (Number(table.rows[j].cells[numField].innerHTML) < Number(table.rows[j + 1].cells[numField].innerHTML)) {
                            table.rows[j].before(table.rows[j + 1]);
                        }
                    }
                }
            }
        }
    }

    // Сортируется, если выбрано одно поле для сортировки (второе)
    if (document.getElementById('SortFirst').value === '5' && document.getElementById('SortSecond').value !== '5') {
        if (document.getElementById('SortSecond').value === '0' || document.getElementById('SortSecond').value === '1' || document.getElementById('SortSecond').value === '3') {
            for (let i = 1; i < table.rows.length; i++) {
                let numField = Number(document.getElementById('SortSecond').value);
                for (let j = 1; j < table.rows.length - i; j++) {
                    if (document.getElementById('Sort2').value === '0') { // Сортировка по возрастанию
                        if (table.rows[j].cells[numField].innerHTML > table.rows[j + 1].cells[numField].innerHTML) {
                            table.rows[j].before(table.rows[j + 1]);
                        }
                    } else if (document.getElementById('Sort2').value === '1') { // Сортировка по убыванию
                        if (table.rows[j].cells[numField].innerHTML < table.rows[j + 1].cells[numField].innerHTML) {
                            table.rows[j].before(table.rows[j + 1]);
                        }
                    }
                }
            }
        } else {
            for (let i = 1; i < table.rows.length; i++) {
                let numField = Number(document.getElementById('SortSecond').value);
                for (let j = 1; j < table.rows.length - i; j++) {
                    if (document.getElementById('Sort2').value === '0') { // Сортировка по возрастанию
                        if (Number(table.rows[j].cells[numField].innerHTML) > Number(table.rows[j + 1].cells[numField].innerHTML)) {
                            table.rows[j].before(table.rows[j + 1]);
                        }
                    } else if (document.getElementById('Sort2').value === '1') { // Сортировка по убыванию
                        if (Number(table.rows[j].cells[numField].innerHTML) < Number(table.rows[j + 1].cells[numField].innerHTML)) {
                            table.rows[j].before(table.rows[j + 1]);
                        }
                    }
                }
            }
        }
    }

    //Сортируется по 2-м полям по возрастанию
    if (document.getElementById('SortFirst').value !== '5' && document.getElementById('SortSecond').value !== '5') {
        if (document.getElementById('SortFirst').value === '0' || document.getElementById('SortFirst').value === '1' || document.getElementById('SortFirst').value === '3') {
            for (let i = 1; i < table.rows.length; i++) {
                let numField = Number(document.getElementById('SortFirst').value);
                let numField2 = Number(document.getElementById('SortSecond').value);
                for (let j = 1; j < table.rows.length - i; j++) {
                    if (document.getElementById('Sort1').value === '0') {
                        if (table.rows[j].cells[numField].innerHTML > table.rows[j + 1].cells[numField].innerHTML) {
                            table.rows[j].before(table.rows[j + 1]);
                        }
                     } else if (document.getElementById('Sort1').value === '1') {
                        if (table.rows[j].cells[numField].innerHTML < table.rows[j + 1].cells[numField].innerHTML) {
                            table.rows[j].before(table.rows[j + 1]);
                        }
                     }
                    if (table.rows[j].cells[numField].innerHTML == table.rows[j + 1].cells[numField].innerHTML) {
                        if (numField2 === 0 || numField2 === 1 || numField2 === 3) {
                            if (document.getElementById('Sort2').value === '0') {
                                if (table.rows[j].cells[numField2].innerHTML > table.rows[j + 1].cells[numField2].innerHTML) {
                                    table.rows[j].before(table.rows[j + 1]);
                                }
                            } else if (document.getElementById('Sort2').value === '1') {
                                if (table.rows[j].cells[numField2].innerHTML < table.rows[j + 1].cells[numField2].innerHTML) {
                                    table.rows[j].before(table.rows[j + 1]);
                                }
                            }
                        } else { 
                            if (document.getElementById('Sort2').value === '0') {
                                if (Number(table.rows[j].cells[numField2].innerHTML) > Number(table.rows[j + 1].cells[numField2].innerHTML)) {
                                    table.rows[j].before(table.rows[j + 1]);
                                }
                            } else if (document.getElementById('Sort2').value === '1') {
                                if (Number(table.rows[j].cells[numField2].innerHTML) < Number(table.rows[j + 1].cells[numField2].innerHTML)) {
                                    table.rows[j].before(table.rows[j + 1]);
                                }
                            }
                        }
                    }
                }
            }
        } else {
            for (let i = 1; i < table.rows.length; i++) {
                let numField = Number(document.getElementById('SortFirst').value);
                let numField2 = Number(document.getElementById('SortSecond').value);
                for (let j = 1; j < table.rows.length - i; j++) {
                    if (document.getElementById('Sort1').value === '0') {
                        if (Number(table.rows[j].cells[numField].innerHTML) > Number(table.rows[j + 1].cells[numField].innerHTML)) {
                            table.rows[j].before(table.rows[j + 1]);
                        }
                    } else if (document.getElementById('Sort1').value === '1') {
                        if (Number(table.rows[j].cells[numField].innerHTML) < Number(table.rows[j + 1].cells[numField].innerHTML)) {
                            table.rows[j].before(table.rows[j + 1]);
                        }
                    }
                    if (Number(table.rows[j].cells[numField].innerHTML) == Number(table.rows[j + 1].cells[numField].innerHTML)) {
                        if (numField2 === 0 || numField2 === 1 || numField2 === 3) {
                            if (document.getElementById('Sort2').value === '0') {
                                if (table.rows[j].cells[numField2].innerHTML > table.rows[j + 1].cells[numField2].innerHTML) {
                                    table.rows[j].before(table.rows[j + 1]);
                                }
                            } else if (document.getElementById('Sort2').value === '1') {
                                if (table.rows[j].cells[numField2].innerHTML < table.rows[j + 1].cells[numField2].innerHTML) {
                                    table.rows[j].before(table.rows[j + 1]);
                                }
                            }
                        } else {
                            if (document.getElementById('Sort2').value === '0') {
                                if (Number(table.rows[j].cells[numField2].innerHTML) > Number(table.rows[j + 1].cells[numField2].innerHTML)) {
                                    table.rows[j].before(table.rows[j + 1]);
                                }
                            } else if (document.getElementById('Sort2').value === '1') {
                                if (Number(table.rows[j].cells[numField2].innerHTML) < Number(table.rows[j + 1].cells[numField2].innerHTML)) {
                                    table.rows[j].before(table.rows[j + 1]);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

// Очистить все
clean.onclick = function () {
    //Очистка выбора категорий
    let filterCateg = document.getElementsByClassName('filtCateg');
    for (let i in filterCateg) {
        filterCateg[i].checked = false;
    }

    //Очистка выбора гендера
    document.getElementById('filtGender').value = '2';

    //Очистка стоимости
    document.getElementById('maxPrice').value = 100;
    document.getElementById('maxPrice').value = 5950;

    //Очистка сортировки
    document.getElementById('SortFirst').value = '5';
    document.getElementById('SortSecond').value = '5';
    document.getElementById('Sort1').value = '0';
    document.getElementById('Sort2').value = '0';

    //Восстановление таблицы
    let table = document.getElementById('table');
    for (let i = 1; i < table.rows.length; i++) {
        let row = table.rows[i];
        if (row.hidden === true) {
            row.hidden = false;
        }
    }
}