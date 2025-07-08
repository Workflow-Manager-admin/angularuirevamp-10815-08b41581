import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardChartComponent } from './dashboard-chart.component';

import { ChartData, ChartOptions } from 'chart.js';

/*
PUBLIC_INTERFACE
AppComponent: Main shell for dashboard, provides chart data and passes it to chart components in relevant dashboard sections.
*/
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DashboardChartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular';

  // Demo data – In real usage, replace with API/service data
  lineChartData: ChartData<'line'> = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [110, 135, 130, 120, 150, 160, 170],
        label: 'Packets',
        borderColor: '#4669fa',
        backgroundColor: 'rgba(70,105,250,0.13)',
        pointBackgroundColor: '#4669fa',
        tension: 0.3,
        fill: true
      }
    ]
  };
  barChartData: ChartData<'bar'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [2, 6, 10, 8, 7, 9],
        label: 'Device Acquisitions',
        backgroundColor: '#2eb67d'
      }
    ]
  };
  stackedBarChartData: ChartData<'bar'> = {
    labels: ['Video', 'Docs', 'Sensor Data'],
    datasets: [
      {
        label: 'Usage - UI',
        data: [30, 70, 55],
        backgroundColor: '#8f59ff'
      },
      {
        label: 'Usage - Automation',
        data: [50, 18, 30],
        backgroundColor: '#3bd6ff'
      }
    ]
  };

  barOptions: ChartOptions<'bar'> = {
    plugins: {
      legend: { display: false }
    },
    scales: { x: {}, y: { beginAtZero: true } }
  };
  lineOptions: ChartOptions<'line'> = {
    plugins: {
      legend: { display: false }
    },
    elements: {
      point: { radius: 5, hoverRadius: 6 }
    },
    scales: { x: {}, y: { beginAtZero: true } }
  };
  stackedBarOptions: ChartOptions<'bar'> = {
    plugins: {
      legend: {
        display: true,
        labels: { color: '#2d3958' }
      }
    },
    scales: {
      x: { stacked: true },
      y: { stacked: true, beginAtZero: true }
    }
  };
}
