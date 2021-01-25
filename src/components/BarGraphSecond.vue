<template>
    <div id="graph-container">
        <canvas id="chart"></canvas>
    </div>
</template>

<script>
import Chart from 'chart.js';
//import planetChartData from './chart-data.js';

export default {
    props: {
        // data for the chart, passed down from parent (TrackInfo)
        datapoints: { type: Array, default: () => [] },
    },
    methods: {
        createChart(chartId, chartData) {
            const ctx = document.getElementById(chartId);
            const myChart = new Chart(ctx, {
                type: chartData.type,
                data: chartData.data,
                options: chartData.options,
            });
        }
    },
    data() {
        return {
            chart: null, // holds the chart object
            chartData : {
                type: 'bar',
                data: {
                    labels: ['Acoustic', 'Danceability', 'Energy', 'Speechiness', 'Valence'],
                    datasets: [
                        { // one line graph
                            label: 'Rating',
                            data: this.datapoints,
                            backgroundColor: [
                                'rgba(228, 44, 106, 0.6)', // Blue
                                'rgba(228, 44, 106, 0.6)',
                                'rgba(228, 44, 106, 0.6)',
                                'rgba(228, 44, 106, 0.6)',
                                'rgba(228, 44, 106, 0.6)',
                            ],
                            borderColor: [
                                '#e42c6a',
                                '#e42c6a',
                                '#e42c6a',
                                '#e42c6a',
                                '#e42c6a',
                            ],
                            borderWidth: 3
                        },
                    ]
                },
                options: {
                    responsive: true,
                    lineTension: 1,
                    maintainAspectRatio: false,
                    layout: {
                        padding: {
                            left: 20,
                            right: 20,
                            top: 20,
                            bottom: 20,
                        }
                    },
                    legend: {
                        display: false,
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                max: 10,
                                padding: 25,
                                fontColor: "rgb(103, 211, 191)",
                            },
                            gridLines: {
                                display: false,
                            },
                        }],
                        xAxes: [{
                            ticks: {
                                fontColor: "rgb(103, 211, 191)",
                            },
                            gridLines: {
                                display: false,
                            },
                        }]
                    },
                    tooltips: {
                        enabled: true,
                        custom: function(tooltip) {
                            if (!tooltip) return;
                            // disable displaying the color box;
                            tooltip.displayColors = false;
                        },
                        callbacks: {
                            label: function(tooltipItem) {
                                //return "$" + tooltipItem.xLabel + " and so worth it !";
                                var tooltip = "";
                                console.log(tooltipItem.xLabel);
                                switch(tooltipItem.xLabel){
                                    case "Acoustic":
                                        tooltip += "how acoustic the track is";
                                        break;
                                    case "Danceability":
                                        tooltip += "how suitable the track is for dancing";
                                        break;
                                    case "Energy":
                                        tooltip += "track intensity and activity";
                                        break;
                                    case "Speechiness":
                                        tooltip += "the presence of spoken words in a track."
                                        break;
                                    case "Valence":
                                        tooltip += "how cheerful the track is";
                                        break;
                                }
                                return [Number(tooltipItem.yLabel), tooltip];
                            },
                        }
                    },
                }
            }
        }
    },
    mounted() {
        //create the chart using Chart.js. Info can be found here: https://www.chartjs.org/docs/latest/
        var ctx = document.getElementById('chart').getContext('2d');
        this.chart = new Chart(ctx, this.chartData);
        console.log(this.chart);
    },
    watch: {
        datapoints(){
            // when the datapoints prop gets changed when the user clicks a new track to view,
            // update the chart!
            this.chart.data.datasets[0].data = this.datapoints;
            this.chart.update();
        }
    }
}

</script>
<style scoped>

#graph-container{
    position: relative;
    height: 100%;
    width: 100%;
}

/*#planet-chart{
    height: 90%;
    width: 90%;
}*/
</style>