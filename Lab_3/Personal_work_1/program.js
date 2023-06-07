function foX(x) {
    return (2 * Math.sin(x) - Math.sin(2 * x) + 3);
}
function foY(x) {
    return (- 2 * Math.cos(x) - Math.cos(2 * x));
}
let a = 0;
let b = 2 * Math.PI;

function drawGraph(data) {
    let n = document.getElementById('Number').value;
    let h = (b - a) / (n - 1);

    let arrGraph = [];
    for (let i = 0; i < n; i++) {
        let x = a + i * h;
        arrGraph.push({'x': foX(x), 'f': foY(x)});
    }

    let width = 500; 
    let height = 500;

    let svg = d3.select("svg") 
        .attr("height", height)
        .attr("width", width)
        .style("border", "solid thin grey");
    svg.selectAll("*").remove();

    let marginX = 50; 
    let marginY = 40;

    let minMaxF = d3.extent(arrGraph.map(d => d.f));
    let min = minMaxF[0];
    let max = minMaxF[1];

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

    // отрисовка осей в SVG-элементе
    // пересечение осей координат в точке (0,0)
    /*
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
    */

    svg.selectAll(".dot") 
        .data(arrGraph)
        .enter()
        .append("circle")
        .attr("r", 10)
        .attr("cx", function(d) { return scaleX(d.x); }) 
        .attr("cy", function(d) { return scaleY(d.f); }) 
        .attr("transform", `translate(${marginX}, ${marginY})`)
        .style("fill", "blue");
};