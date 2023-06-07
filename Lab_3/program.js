let element = document.getElementById("showTable");
//let groupObj = d3.group(books, d => d.author);
element.onclick = function() {
if (this.value === "Показать таблицу") { 
    this.value = "Скрыть таблицу"

    let nameTable = ['Название','Тип','Страна','Город','Год','Высота','Этажность'];

    d3.select("div.table") 
    .select("table")
    .append('tr');

    d3.select("div.table") 
    .select("table") 
    .selectAll("th") 
    .data(nameTable)
    .enter()
    .append('th');

    d3.select("div.table") 
    .select("table") 
    .selectAll("tr")
    .remove();

    d3.select("div.table") 
    .select("table") 
    .selectAll("th") 
    .data(nameTable)
    .html(function(d){ 
        return `<th>${d}</th>`
    });

    d3.select("div.table") 
    .select("table") 
    .selectAll("tr")
    .data(buildings) 
    .enter() 
    .append('tr');

    d3.select("div.table") 
    .select("table") 
    .selectAll("tr") 
    .data(buildings)
    .html(function(d){ 
        return `<td>${d["Название"]}</td><td>${d["Тип"]}</td>
        <td>${d["Страна"]}</td><td>${d["Город"]}</td><td>${d["Год"]}</td>
        <td>${d["Высота"]}</td><td>${d["Этажность"]}</td>`
    });

} else {
this.value = "Показать таблицу"
d3.select("div.table") 
    .select("table") 
    .selectAll("th")
    .remove();

d3.select("div.table") 
    .select("table") 
    .selectAll("tr")
    .remove();
}
};

function getArrGraph(arrObject, fieldX, fieldY) {
    let groupObj = d3.group(arrObject, d => d[fieldX])
    arrGroup = [];
    for(let entry of groupObj) {
        let minMax = d3.extent(entry[1].map(d => d[fieldY]));
        let elementGroup = {};
        elementGroup.labelX = entry[0];
        elementGroup.valueMin = minMax[0];
        elementGroup.valueMax = minMax[1];
        arrGroup.push(elementGroup);
    }
    return arrGroup; 
}
function drawGraph(data) {
    
    let fieldX = document.getElementsByClassName('OX');
    for (let i in fieldX) {
        if (fieldX[i].checked == true) {
            fieldX = fieldX[i].value;
            break;
        }
    }
    
    // формируем массив для построения диаграммы
    let arrGraph = getArrGraph(buildings, fieldX, "Высота");

    let marginX = 50; 
    let marginY = 50;
    let height = 400; 
    let width = 800;

    let svg = d3.select("svg") 
        .attr("height", height)
        .attr("width", width); 
    svg.selectAll("*").remove();// очищаем svg перед построением

    // определяем минимальное и максимальное значение по оси OY
    let min = d3.min(arrGraph.map(d => d.valueMin)) * 0.95;
    let max = d3.max(arrGraph.map(d => d.valueMax)) * 1.05; 
    
    let xAxisLen = width - 2 * marginX;
    let yAxisLen = height - 2 * marginY;

    // определяем шкалы для осей
    let scaleX = d3.scaleBand() 
        .domain(arrGraph.map(function(d) {
        return d.labelX; })
        )
        .range([0, xAxisLen],1);

    let scaleY = d3.scaleLinear() 
        .domain([min, max])
        .range([yAxisLen, 0]);

    // создаем оси
    let axisX = d3.axisBottom(scaleX); // горизонтальная 
    let axisY = d3.axisLeft(scaleY);// вертикальная

    // отображаем ось OX, устанавливаем подписи оси ОX и угол их наклона
    svg.append("g")
    .attr("transform", `translate(${marginX}, ${height - marginY})`) 
    .call(axisX)
    .attr("class", "x-axis")
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", function (d) {
    return "rotate(-45)"; });

    // отображаем ось OY
    svg.append("g")
        .attr("transform", `translate(${marginX}, ${marginY})`) 
        .attr("class", "y-axis")
        .call(axisY);

    // создаем набор вертикальных линий для сетки
    d3.selectAll("g.x-axis g.tick") 
        .append("line") // добавляем линию .classed("grid-line", true) // добавляем класс .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", 0)
        .attr("y2", - (yAxisLen));

    // создаем горизонтальные линии сетки
    d3.selectAll("g.y-axis g.tick") 
        .append("line") 
        .classed("grid-line", true) 
        .attr("x1", 0)
        .attr("y1", 0) 
        .attr("x2", xAxisLen)
        .attr("y2", 0);

    let typeOfDiagr = document.getElementsByClassName('Type');
    for (let i in typeOfDiagr) {
        if (typeOfDiagr[i].checked == true) {
            typeOfDiagr = typeOfDiagr[i].value;
            break;
        }
    }

    let fieldY = document.getElementsByClassName('OY');
    let arr = [];
    for (let i in fieldY) {
        if (fieldY[i].checked == true) {
            arr.push(fieldY[i].value);
        }
    }

    if (typeOfDiagr === "Точечная") {
        if (arr.length == 2) {
            // отображаем данные в виде точечной диаграммы
            svg.selectAll(".dot") 
            .data(arrGraph) 
            .enter() 
            .append("circle")
            .attr("r", 5)
            .attr("cx", function(d) { return scaleX(d.labelX); })
            .attr("cy", function(d) { return scaleY(d.valueMax); }) 
            .attr("transform",`translate(${marginX + scaleX.bandwidth()/2}, ${marginY})`) 
            .style("fill", "red")

            svg.selectAll(".dot")
            .data(arrGraph)
            .enter()
            .append("circle")
            .attr("r", 5)
            .attr("cx", function(d) { return scaleX(d.labelX); }) 
            .attr("cy", function(d) { return scaleY(d.valueMin); }) 
            .attr("transform",`translate(${marginX + scaleX.bandwidth()/2}, ${marginY})`) 
            .style("fill", "blue")
        } else if (arr[arr.length - 1] == '0') {
            // отображаем данные в виде точечной диаграммы (Max)
            svg.selectAll(".dot") 
            .data(arrGraph) 
            .enter() 
            .append("circle")
            .attr("r", 5)
            .attr("cx", function(d) { return scaleX(d.labelX); })
            .attr("cy", function(d) { return scaleY(d.valueMax); }) 
            .attr("transform",`translate(${marginX + scaleX.bandwidth()/2}, ${marginY})`) 
            .style("fill", "red")
        } else if (arr[arr.length - 1] == '1') {
            // отображаем данные в виде точечной диаграммы (Min)
            svg.selectAll(".dot")
            .data(arrGraph)
            .enter()
            .append("circle")
            .attr("r", 5)
            .attr("cx", function(d) { return scaleX(d.labelX); }) 
            .attr("cy", function(d) { return scaleY(d.valueMin); }) 
            .attr("transform",`translate(${marginX + scaleX.bandwidth()/2}, ${marginY})`) 
            .style("fill", "blue")
        } else if (arr.length === 0) {
            return alert("Вам необходимо выбрать значение по оси OY!");
        }
    } 
    else if (typeOfDiagr === "Столбчатая") {

        scaleX.padding(0.2);

        if (arr.length == 2) {
            //создание и отрисовка столбиков гистограммы
            svg.append("g")
                .attr("transform", `translate(${ marginX}, ${ marginY})`) 
                .selectAll(".rect")
                .data(arrGraph)
                .enter()
                .append("rect")
                .attr("x", function(d) { return scaleX(d.labelX) ; })
                .attr("width", scaleX.bandwidth())
                .attr("y", function(d) { return scaleY(d.valueMax); })
                .attr("height", function(d) { return yAxisLen - scaleY(d.valueMax); }) 
                .attr("fill","red");

                svg.append("g")
                .attr("transform", `translate(${ marginX}, ${ marginY})`) 
                .selectAll(".rect")
                .data(arrGraph)
                .enter()
                .append("rect")
                .attr("x", function(d) { return scaleX(d.labelX) ; })
                .attr("width", scaleX.bandwidth())
                .attr("y", function(d) { return scaleY(d.valueMin); })
                .attr("height", function(d) { return yAxisLen - scaleY(d.valueMin); }) 
                .attr("fill", "blue");

        } else if (arr[arr.length - 1] == '0') {

            //создание и отрисовка столбиков гистограммы
            svg.append("g")
                .attr("transform", `translate(${ marginX}, ${ marginY})`) 
                .selectAll(".rect")
                .data(arrGraph)
                .enter()
                .append("rect")
                .attr("x", function(d) { return scaleX(d.labelX) ; })
                .attr("width", scaleX.bandwidth())
                .attr("y", function(d) { return scaleY(d.valueMax); })
                .attr("height", function(d) { return yAxisLen - scaleY(d.valueMax); }) 
                .attr("fill", "red");

        } else if (arr[arr.length - 1] == '1') {

            //создание и отрисовка столбиков гистограммы
            svg.append("g")
                .attr("transform", `translate(${ marginX}, ${ marginY})`) 
                .selectAll(".rect")
                .data(arrGraph)
                .enter()
                .append("rect")
                .attr("x", function(d) { return scaleX(d.labelX) ; })
                .attr("width", scaleX.bandwidth())
                .attr("y", function(d) { return scaleY(d.valueMin); })
                .attr("height", function(d) { return yAxisLen - scaleY(d.valueMin); }) 
                .attr("fill", "blue");

        } else if (arr.length === 0) {
            return alert("Вам необходимо выбрать значение по оси OY!");
        }
    }
}