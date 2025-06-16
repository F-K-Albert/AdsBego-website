// Portfolio Filter
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    document.querySelectorAll('.portfolio-item').forEach(item => {
      item.style.display = (filter === 'all' || item.dataset.category === filter) ? 'block' : 'none';
    });
  });
});

// Charts
document.addEventListener('DOMContentLoaded', function() {
  // Asset Allocation Pie Chart
  const allocationCtx = document.getElementById('allocationChart').getContext('2d');
  new Chart(allocationCtx, {
    type: 'pie',
    data: {
      labels: ['Stocks', 'Crypto', 'Commodities', 'Startups', 'Real Estate'],
      datasets: [{
        data: [35, 20, 15, 20, 10],
        backgroundColor: ['#3a86ff', '#8338ec', '#ff006e', '#fb5607', '#ffbe0b'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'right' }
      }
    }
  });

  // Performance Combo Chart
  const performanceCtx = document.getElementById('performanceChart').getContext('2d');
  new Chart(performanceCtx, {
    type: 'bar',
    data: {
      labels: ['2019', '2020', '2021', '2022', '2023'],
      datasets: [
        {
          label: 'S&P 500',
          data: [28.9, 16.3, 26.9, -19.4, 24.2],
          borderColor: '#333',
          backgroundColor: 'rgba(0,0,0,0.1)',
          type: 'line',
          tension: 0.4
        },
        {
          label: 'Our Portfolio',
          data: [22.1, 34.5, 41.7, -12.8, 32.4],
          backgroundColor: '#3a86ff'
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  });

  // D3.js Bubble Chart (Sector Exposure)
  const data = [
    { name: "Tech", value: 40, color: "#3a86ff" },
    { name: "Fintech", value: 25, color: "#8338ec" },
    { name: "Real Estate", value: 20, color: "#ffbe0b" },
    { name: "Commodities", value: 15, color: "#ff006e" }
  ];

  const width = document.getElementById('bubbleChart').clientWidth;
  const height = 500;

  const svg = d3.select("#bubbleChart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const simulation = d3.forceSimulation(data)
    .force("charge", d3.forceManyBody().strength(5))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("collision", d3.forceCollide().radius(d => d.value * 1.5));

  const circles = svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("r", d => d.value)
    .attr("fill", d => d.color)
    .attr("opacity", 0.8);

  simulation.on("tick", () => {
    circles
      .attr("cx", d => d.x)
      .attr("cy", d => d.y);
  });

  // Labels
  svg.selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .text(d => d.name)
    .attr("x", d => d.x)
    .attr("y", d => d.y)
    .attr("text-anchor", "middle")
    .attr("dy", 4)
    .style("fill", "white");
});