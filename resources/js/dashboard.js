import { io } from 'socket.io-client'

const socket = io()

var MAX_DATA_SET_LENGTH = 20

var ChartCPULabels = Array(MAX_DATA_SET_LENGTH).fill(0)
var ChartCPUData = {
  "Giv": Array(MAX_DATA_SET_LENGTH).fill(0),
  "Piran": Array(MAX_DATA_SET_LENGTH).fill(0),
  "Esfandiar": Array(MAX_DATA_SET_LENGTH).fill(0),
  "Rostam": Array(MAX_DATA_SET_LENGTH).fill(0),
  "Roudabeh": Array(MAX_DATA_SET_LENGTH).fill(0),
}

var ctx = document.getElementById('chart-bars').getContext('2d')

var ChartDiskUsage = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Sales',
        tension: 0.4,
        borderWidth: 0,
        borderRadius: 4,
        borderSkipped: false,
        backgroundColor: '#fff',
        data: [450, 200, 100, 220, 500, 100, 400, 230, 500],
        maxBarThickness: 6,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
    scales: {
      y: {
        grid: {
          drawBorder: false,
          display: false,
          drawOnChartArea: false,
          drawTicks: false,
        },
        ticks: {
          suggestedMin: 0,
          suggestedMax: 500,
          beginAtZero: true,
          padding: 15,
          font: {
            size: 14,
            family: 'Open Sans',
            style: 'normal',
            lineHeight: 2,
          },
          color: '#fff',
        },
      },
      x: {
        grid: {
          drawBorder: false,
          display: false,
          drawOnChartArea: false,
          drawTicks: false,
        },
        ticks: {
          display: false,
        },
      },
    },
  },
})

var ctx2 = document.getElementById('chart-line').getContext('2d')

var gradientStroke1 = ctx2.createLinearGradient(0, 230, 0, 50)

gradientStroke1.addColorStop(1, 'rgba(203,12,159,0.2)')
gradientStroke1.addColorStop(0.2, 'rgba(72,72,176,0.0)')
gradientStroke1.addColorStop(0, 'rgba(203,12,159,0)') //purple colors

var gradientStroke2 = ctx2.createLinearGradient(0, 230, 0, 50)

gradientStroke2.addColorStop(1, 'rgba(20,23,39,0.2)')
gradientStroke2.addColorStop(0.2, 'rgba(72,72,176,0.0)')
gradientStroke2.addColorStop(0, 'rgba(20,23,39,0)') //purple colors

var ChartCPU = new Chart(ctx2, {
  type: 'line',
  data: {
    labels: ChartCPULabels,
    datasets: [
      {
        label: 'Giv',
        tension: 0.4,
        borderWidth: 0,
        pointRadius: 0,
        borderColor: '#cb0c9f',
        borderWidth: 3,
        backgroundColor: gradientStroke1,
        fill: true,
        data: ChartCPUData["Giv"],
        maxBarThickness: 6,
      },
      {
        label: 'Piran',
        tension: 0.4,
        borderWidth: 0,
        pointRadius: 0,
        borderColor: '#3A416F',
        borderWidth: 3,
        backgroundColor: gradientStroke2,
        fill: true,
        data: ChartCPUData["Piran"],
        maxBarThickness: 6,
      },
      {
        label: 'Esfandiar',
        tension: 0.4,
        borderWidth: 0,
        pointRadius: 0,
        borderColor: '#3A416F',
        borderWidth: 3,
        backgroundColor: gradientStroke2,
        fill: true,
        data: ChartCPUData["Esfandiar"],
        maxBarThickness: 6,
      },
      {
        label: 'Rostam',
        tension: 0.4,
        borderWidth: 0,
        pointRadius: 0,
        borderColor: '#3A416F',
        borderWidth: 3,
        backgroundColor: gradientStroke2,
        fill: true,
        data: ChartCPUData["Rostam"],
        maxBarThickness: 6,
      },
      {
        label: 'Roudabeh',
        tension: 0.4,
        borderWidth: 0,
        pointRadius: 0,
        borderColor: '#3A416F',
        borderWidth: 3,
        backgroundColor: gradientStroke2,
        fill: true,
        data: ChartCPUData["Roudabeh"],
        maxBarThickness: 6,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        grid: {
          drawBorder: false,
          display: true,
          drawOnChartArea: true,
          drawTicks: false,
          borderDash: [5, 5],
        },
        ticks: {
          display: true,
          padding: 10,
          color: '#b2b9bf',
          font: {
            size: 11,
            family: 'Open Sans',
            style: 'normal',
            lineHeight: 2,
          },
        },
      },
      x: {
        grid: {
          drawBorder: false,
          display: false,
          drawOnChartArea: false,
          drawTicks: false,
          borderDash: [5, 5],
        },
        ticks: {
          display: true,
          color: '#b2b9bf',
          padding: 20,
          font: {
            size: 11,
            family: 'Open Sans',
            style: 'normal',
            lineHeight: 2,
          },
        },
      },
    },
  },
})

window.ChartCPU = ChartCPU
window.ChartDiskUsage = ChartDiskUsage
window.ChartCPULabels = ChartCPULabels

socket.emit('Name', { Name: 'Frontend' })

socket.on('Monitor', (data) => {
  var label = new Date().toLocaleTimeString()
  ChartCPULabels.push(label)
  ChartCPULabels.shift()
  ChartCPUData[data['name']].shift()
  ChartCPUData[data['name']].push(data['cpu'])
  ChartCPU.update()
  var LoadAvgElement = document.getElementById(data['name'] + '_LoadAvg')
  var RAMElement = document.getElementById(data['name'] + '_RAM')
  var UsersCountElement = document.getElementById(data['name'] + '_UsersCount')
  var TempElement = document.getElementById(data['name'] + '_Temp')
  var TempBarElement = document.getElementById(data['name'] + '_Tempbar')
  LoadAvgElement.innerText = data['loadAvg']
  RAMElement.innerText = data['ram']+"%"
  UsersCountElement.innerText = data['usersCount']
  TempElement.innerText = data['packageTemp']
  TempBarElement.ariaValueNow = data['packageTemp']
  TempBarElement.style.width = data['packageTemp']+"%"
})

