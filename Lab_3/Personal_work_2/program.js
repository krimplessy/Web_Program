function f(x) {
    let res = (x - 8)/(x**2 - 3*x + 2);
    return res;
}

function drawGraph(data) {
    let a = Number(document.getElementById('NumberMin').value);
    let b = Number(document.getElementById('NumberMax').value);

    if (a >= b) return alert('Вам необходимо ввести интервал от меньшего числа к большему!');

    let n = 1000;
    let h = (b - a)/(n - 1);

    let arrGraph = []; //Часть графика до x = 1
    let arrGraph1 = []; //Часть графика от x = 1 до x = 2
    let arrGraph2 = []; //Часть графика от x = 2

    for (let i = 0; i < n; i++) {
        let x = a + (h * i);
        if (x < 1) {
            arrGraph.push({'x': x, 'f': f(x)});
        } else if (x > 1 && x < 2) {
            arrGraph1.push({'x': x, 'f': f(x)});
        } else if (x > 2) {
            arrGraph2.push({'x': x, 'f': f(x)});
        } else if (x === 1 || x === 2) continue;
        /*if (x > 1 && x < 2) continue;
        arrGraph.push({'x': x, 'f': f(x)});*/
    }

    let width = 700; 
    let height = 700;

    let svg = d3.select("svg") 
        .attr("height", height)
        .attr("width", width)
        .style("border", "solid thin grey");
    svg.selectAll("*").remove();

    let marginX = 50; 
    let marginY = 40;

    let minMaxF1 = d3.extent(arrGraph.map(d => d.f)); // минимум и максимум из интервала до х = 1
    let min1 = minMaxF1[0];
    let max1 = minMaxF1[1];

    //Проверка на undefine (если такого интервала нет, то чтобы не было проблем с выбором итогого минимума и максимума)
    if (typeof min1 == 'undefined') min1 = 100;
    if (typeof max1 == 'undefined') max1 = -100;

    let minMaxF2 = d3.extent(arrGraph1.map(d => d.f)); // минимум и максимум из интервала от х = 1до х = 2
    let min2 = minMaxF2[0];
    let max2 = minMaxF2[1];

    //Проверка на undefine (если такого интервала нет, то чтобы не было проблем с выбором итогого минимума и максимума)
    if (typeof min2 == 'undefined') min2 = 100;
    if (typeof max2 == 'undefined') max2 = -100;

    let minMaxF3 = d3.extent(arrGraph2.map(d => d.f)); // минимум и максимум из интервала от х = 2
    let min3 = minMaxF3[0];
    let max3 = minMaxF3[1];

    //Проверка на undefine (если такого интервала нет, то чтобы не было проблем с выбором итогого минимума и максимума)
    if (typeof min3 == 'undefined') min3 = 100;
    if (typeof max3 == 'undefined') max3 = -100;

    let min = Math.min(min1, min2, min3);
    let max = Math.max(max1, max2, max3);

    if (max > 50) {
        max = 50;
    }
    if (min < -50) {
        min = -50;
    }

    // функция интерполяции значений на оси
    let scaleX = d3.scaleLinear() 
        .domain([a, b])
        .range([0, width - 2 * marginX]);

    let scaleY = d3.scaleLinear() 
        .domain([min, max])
        .range([height - 2 * marginY, 0]);

    // создание осей
    let axisX = d3.axisBottom(scaleX); // горизонтальная
    let axisY = d3.axisLeft(scaleY); // вертикальная
    
    // отрисовка осей в SVG-элементе с центром в (0,0)
    svg.append("g")
        .attr("transform", `translate(${marginX}, ${scaleY(0) + marginY})`) 
        .call(axisX);

    svg.append("g")
        .attr("transform", `translate(${marginX + scaleX(0)}, ${marginY})`) 
        .call(axisY);
    
    let lineF = d3.line() 
        .x(function(d) {
            return scaleX(d.x); })
        .y(function(d) {
            return scaleY(d.f);
        });
        
    if (arrGraph.length > 0) {
        svg.append("path") // добавляем путь
    // созданному пути добавляются данные массива arrGraph в качестве атрибута
        .datum(arrGraph)
        // вычисляем координаты концов линий с помощью функции lineF 
        .attr("d", lineF)
        // помемещаем путь из линий в область построения 
        .attr("transform", `translate(${marginX}, ${marginY})`)
        // задаем стиль линии графика
        .style("stroke-width", "2")   
        .style("stroke", "red");
    }
    if (arrGraph1.length > 0) {
        svg.append("path") // добавляем путь
        // созданному пути добавляются данные массива arrGraph в качестве атрибута
            .datum(arrGraph1)
            // вычисляем координаты концов линий с помощью функции lineF 
            .attr("d", lineF)
            // помемещаем путь из линий в область построения 
            .attr("transform", `translate(${marginX}, ${marginY})`)
            // задаем стиль линии графика
            .style("stroke-width", "2")   
            .style("stroke", "red");
    }
    if (arrGraph2.length > 0) {
        svg.append("path") // добавляем путь
        // созданному пути добавляются данные массива arrGraph в качестве атрибута
            .datum(arrGraph2)
            // вычисляем координаты концов линий с помощью функции lineF 
            .attr("d", lineF)
            // помемещаем путь из линий в область построения 
            .attr("transform", `translate(${marginX}, ${marginY})`)
            // задаем стиль линии графика
            .style("stroke-width", "2")   
            .style("stroke", "red");
    }
}