type = ['primary', 'info', 'success', 'warning', 'danger'];
const __chart_option = (cor_fonte,rgba_text) =>{
    return  {
        maintainAspectRatio: false,
        legend:{
            display: false
        },
        tooltips: {
            backgroundColor: '#f5f5f5',
            titleFontColor:'#333',
            bodyFontColor:'#666',
            bodySpacing:4,
            xPadding:12,
            mode:"nearest",
            intersect:0,
            position:"nearest"
        },
        responsive: true,
        animations:false,
        scales:{
            yAxes: [
                {
                    barPercentage: 1.6,
                    gridLines: {
                        drawBorder: false,
                        color: 'rgba(29,140,248,0.0)',
                        zeroLineColor: "transparent",
                    },
                    ticks: {
                        suggestedMin: 60,
                        suggestedMax: 125,
                        padding: 20,
                        fontColor: cor_fonte
                    }
                }
            ],
            xAxes:[
                {
                    barPercentage: 1.6,
                    gridLines: {
                        drawBorder: false,
                        color: rgba_text,
                        zeroLineColor: "transparent",
                    },
                    ticks: {
                        padding: 20,
                        fontColor: cor_fonte
                    }
                }
            ]
        }
    };
};

const __adiciona_dataset = (chart, dados, cor) =>{
    let dataset = JSON.parse(JSON.stringify(chart.datasets[0]))
    dataset.borderColor = cor
    dataset.pointBackgroundColor = cor
    dataset.pointHoverBackgroundColor = cor
    dataset.data = [...dados]
    chart.datasets.push(dataset)
}

const GRAFICOS = {}
const __dados = (labels = ['a','b'], dados = [1,2],background, cor = '#d048b6') =>{
    return {
        labels: labels,
        datasets: [{
            label: "Data",
            fill: true,
            backgroundColor: background,
            borderColor: cor,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: cor,
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: cor,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: dados,
        }]
    }
}
const empurra_dado = (dado) => {
    if(GRAFICOS[dado.nome] === undefined){
        console.log(`grafico ${dado.nome} perdido no meio de ${Object.keys(GRAFICOS)}`)
        return;
    }
    let grafico = GRAFICOS[dado.nome]
    let ds = grafico.data.datasets[0]
    ds.data.shift()
    ds.data.push(dado.val)
    grafico.update();
}
const inicia_grafico = (nome, chartId, labels, cor) => {
    const ctx = document.getElementById(chartId).getContext("2d");
    const gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, 'rgba(72,72,176,0.2)');
    gradientStroke.addColorStop(0.2, 'rgba(72,72,176,0.0)');
    gradientStroke.addColorStop(0, 'rgba(119,52,169,0)'); //purple colors

    const data = __dados(labels, labels.map(x=>10), gradientStroke,cor);
    const myChartData = new Chart(ctx, {
        type: 'line',
        data: data,
        options: __chart_option(cor,'rgba(29,140,248,0.0)')
    });
    GRAFICOS[nome] = myChartData;
    return myChartData
}

