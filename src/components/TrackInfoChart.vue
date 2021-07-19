<template>
    <div id="graph-container">
        <!--Chart gets rendered here info on it can be found here: https://www.chartjs.org/docs/latest/-->
        <canvas id="chart" aria-label="Track info chart" role="img">
            <p>Track info chart</p>
        </canvas>
    </div>
</template>

<script>
import Chart from 'chart.js';

export default {
    props: {
        // data for the chart, passed down from parent (TrackInfo.vue)
        datapoints: { type: Array, default: () => [] },
    },
    methods: {
        /** Function to create the chart */
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
            // chart data to use to create the chart
            chartData : {
                type: 'bar',
                data: {
                    labels: ['Acoustic', 'Danceability', 'Energy', 'Valence'],
                    datasets: [
                        { // one line graph
                            label: 'Rating',
                            data: this.datapoints,
                            backgroundColor: [
                                'rgba(228, 44, 106, 0.6)',
                                'rgba(228, 44, 106, 0.6)',
                                'rgba(228, 44, 106, 0.6)',
                                'rgba(228, 44, 106, 0.6)',
                            ],
                            hoverBackgroundColor: [
                                '#e42c6a',
                                '#e42c6a',
                                '#e42c6a',
                                '#e42c6a',
                            ],
                            borderColor: [
                                'rgba(228, 44, 106, 0.6)',
                                'rgba(228, 44, 106, 0.6)',
                                'rgba(228, 44, 106, 0.6)',
                                'rgba(228, 44, 106, 0.6)',
                            ],
                            hoverBorderColor: [
                                '#e42c6a',
                                '#e42c6a',
                                '#e42c6a',
                                '#e42c6a',                                
                            ],
                            borderWidth: 2.8
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
                                /*drawOnChartArea: false,
                                color: "rgba(103, 211, 191, .3)",*/
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
                                var tooltip = "";
                                //console.log(tooltipItem.xLabel);
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
                                return [Number(tooltipItem.yLabel), tooltip]; //returning like this displays the 2 items on 2 separate lines
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
        //console.log(this.chart);
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