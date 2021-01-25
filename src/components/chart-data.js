export const planetChartData = {
    type: 'bar',
    data: {
      labels: ['Acoustic', 'Danceability', 'Energy', 'Speechiness', 'Valence'],
      datasets: [
        { // one line graph
          label: 'Number of Moons',
          data: [2, 67, 62, 27, 14],
          backgroundColor: [
            'rgba(54,73,93,.5)', // Blue
            'rgba(54,73,93,.5)',
            'rgba(54,73,93,.5)',
            'rgba(54,73,93,.5)',
            'rgba(54,73,93,.5)',
          ],
          borderColor: [
            '#47b784',
            '#47b784',
            '#47b784',
            '#47b784',
            '#47b784',
          ],
          borderWidth: 3
        },
        /*{ // another line graph
          label: 'Planet Mass (x1,000 km)',
          data: [4.8, 12.1, 12.7, 6.7, 139.8, 116.4, 50.7, 49.2],
          backgroundColor: [
            'rgba(71, 183,132,.5)', // Green
          ],
          borderColor: [
            '#47b784',
          ],
          borderWidth: 3
        }*/
      ]
    },
    options: {
      responsive: true,
      lineTension: 1,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            padding: 25,
          }
        }]
      }
    }
  }
  
  export default planetChartData;