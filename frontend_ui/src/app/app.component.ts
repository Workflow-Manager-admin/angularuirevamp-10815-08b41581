/* global window */
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardChartComponent } from './dashboard-chart.component';
import { DeviceOverviewComponent } from './device-overview.component';
import { ChartData, ChartOptions } from 'chart.js';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CommonModule, NgIf, NgForOf, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

/*
PUBLIC_INTERFACE
AppComponent: Main shell for dashboard,
- Provides sidebar, topbar, card grid, and footer layout.
- UI state: dark mode, sidebar selection, notification bell, interactive/collapsible cards.
- Handles dummy/mock data for device info, stats, charts.
- Accessible navigation and animated sections.
*/
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    DashboardChartComponent,
    DeviceOverviewComponent,
    CommonModule,
    NgIf,
    NgForOf,
    FormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('expandCollapse', [
      state('void', style({ height: '0px', opacity: 0, overflow: 'hidden' })),
      state('*', style({ height: '*', opacity: 1, overflow: 'visible' })),
      transition('void <=> *', [
        animate('220ms cubic-bezier(0.44,0.19,0.25,1.01)')
      ])
    ])
  ]
})
export class AppComponent {
  title = 'angular';

  // Sidebar state
  selectedMenu = 0; // 0: Broadband, 1: LAN, 2: Syslog

  // Header/profile/darkmode state
  isDarkMode = false;
  notifCount = 2; // mock: two active notifications
  searchText = '';
  breadcrumb = ['Device Management', 'Dashboard'];

  platformId: Object;
  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.platformId = platformId;
  }

  // Section collapses (all default expanded)
  networkOpen = true;
  deviceAcqOpen = true;
  contentUsageOpen = true;

  // Device/Stats mock
  deviceInfo = {
    icon: 'wifi',
    type: 'Wi-Fi Gateway',
    status: 'Active', // "Active", "Offline", "Restarting"
    statusCode: 1, // 0=offline, 1=active, 2=warning
    location: 'Building A, Floor 2',
    ip: '192.168.12.24',
    mac: '04:D4:C4:28:41:82',
    firmware: '2.19.4-c',
    fwUpdate: true,
    version: 'v2.19.4',
    health: 'Good', // Good, Warning, Critical
    healthInfo: 'Performance stable, 5.3% error rate in past 24h',
    connectivity: 'Ethernet, Wi-Fi',
    connectionsStats: [
      { type: 'LAN', icon: 'lan', count: 3 },
      { type: 'Wi-Fi', icon: 'wifi', count: 8 },
      { type: 'Guest', icon: 'accounts', count: 1 }
    ],
    uptime: '13d 9h 02m',
    cpu: 37,      // %
    memory: 53,   // %
    disk: 62,     // %
    serial: 'AX2027-8932',
    lastUpdated: 'Just now',
    notes: 'Device near HVAC, check for temp fluctuation',
  };
  quickStats = {
    online: 12,
    offline: 2,
    alerts: 1
  };

  // Demo chart data illustrating modern, pastel palette and usage-focused scenarios:
  lineChartData: ChartData<'line'> = {
    labels: [
      'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'
    ],
    datasets: [
      {
        data: [120, 175, 132, 205, 189, 210],
        label: 'Network Traffic',
        borderColor: '#4669fa',
        backgroundColor: 'rgba(70,105,250,0.13)',
        pointBackgroundColor: '#ffffff',
        pointBorderColor: '#4669fa',
        pointHoverBackgroundColor: '#4669fa',
        pointHoverBorderColor: '#3bd6ff',
        tension: 0.36,
        fill: true,
        cubicInterpolationMode: 'monotone'
      }
    ]
  };
  barChartData: ChartData<'bar'> = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        data: [15, 24, 18, 29],
        label: 'Device Acquisitions',
        backgroundColor: [
          'rgba(46,182,125,0.72)', // pastel green
          'rgba(70,105,250,0.72)', // pastel blue
          'rgba(63,214,255,0.62)', // pastel cyan
          'rgba(143,89,255,0.64)'  // pastel purple
        ],
        borderRadius: 10,
        barPercentage: 0.68,
        categoryPercentage: 0.72
      }
    ]
  };
  stackedBarChartData: ChartData<'bar'> = {
    labels: ['Video', 'Web', 'Gaming', 'Social'],
    datasets: [
      {
        label: 'Usage (GB/day)',
        data: [33, 25, 14, 22],
        backgroundColor: '#4669fa' // pastel blue
      },
      {
        label: 'Gaming (GB/day)',
        data: [4, 5, 29, 5],
        backgroundColor: '#3bd6ff' // pastel cyan
      },
      {
        label: 'Social (GB/day)',
        data: [6, 8, 6, 21],
        backgroundColor: '#2eb67d' // pastel green
      },
      {
        label: 'Streaming (GB/day)',
        data: [16, 12, 8, 13],
        backgroundColor: '#8f59ff' // pastel purple
      }
    ]
  };

  // Chart.js options with animation, tooltips, Inter font, and palette:
  barOptions: ChartOptions<'bar'> = {
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#4669fa',
        titleColor: '#fff',
        bodyColor: '#d6e4ff',
        titleFont: { family: 'Inter', weight: 600, size: 13 },
        bodyFont: { family: 'Inter', size: 14 }
      }
    },
    scales: { 
      x: {
        grid: { display: false }, 
        ticks: { font: { family: 'Inter', weight: 600 }, color: '#2d3958'}
      },
      y: { beginAtZero: true, grid: { color: '#f0f4fa' }, ticks: {color: '#7a88af', font: { family: 'Inter' } } } 
    },
    animation: {
      duration: 950,
      easing: 'easeInOutCubic'
    }
  };
  lineOptions: ChartOptions<'line'> = {
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: '#4669fa',
        titleColor: '#fff',
        bodyColor: '#d6e4ff',
        intersect: false,
        titleFont: { family: 'Inter', weight: 700, size: 13 },
        bodyFont: { family: 'Inter', weight: 500, size: 13 }
      }
    },
    elements: {
      point: { radius: 6, hoverRadius: 8, borderWidth: 2, borderColor: '#4669fa', backgroundColor: '#fff' }
    },
    scales: { 
      x: { 
        grid: { display: false },
        ticks: { font: { family: 'Inter', weight: 600 }, color: '#2d3958' }
      },
      y: { 
        beginAtZero: true,
        grid: { color: '#f0f4fa' },
        ticks: {color: '#7a88af', font: { family: 'Inter' } }
      }
    },
    animation: {
      duration: 950,
      easing: 'easeInOutCubic'
    }
  };
  stackedBarOptions: ChartOptions<'bar'> = {
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: { color: '#4669fa', font: { family: 'Inter', weight: 600, size: 13 }, usePointStyle: true, padding: 16 }
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#3bd6ff',
        titleColor: '#2d3958',
        bodyColor: '#23272f',
        titleFont: { family: 'Inter', weight: 600, size: 13 },
        bodyFont: { family: 'Inter', size: 13 }
      }
    },
    scales: {
      x: { 
        stacked: true, 
        grid: { display: false },
        ticks: { font: { family: 'Inter', weight: 600 }, color: '#2d3958'}
      },
      y: { 
        stacked: true, 
        beginAtZero: true, 
        grid: { color: '#f0f4fa' },
        ticks: {color: '#7a88af', font: { family: 'Inter' } }
      }
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart'
    }
  };

  // PUBLIC_INTERFACE
  selectMenu(idx: number) {
    /** Set sidebar menu selection (for highlighting) */
    this.selectedMenu = idx;
    // For a real app: route navigation etc. here
  }

  // PUBLIC_INTERFACE
  toggleDarkMode() {
    /** Switch light/dark mode (modern pastel/soft) */
    this.isDarkMode = !this.isDarkMode;
    // Only access window.document in browser context (fixes linter no-undef)
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined' && window.document && window.document.body) {
      window.document.body.classList.toggle('dark-mode', this.isDarkMode);
    }
  }

  // PUBLIC_INTERFACE
  toggleNotifications() {
    /** Clear (mock) notifications; indicate bell interaction */
    if (this.notifCount > 0) {
      this.notifCount = 0;
    }
  }

  // PUBLIC_INTERFACE
  onChartHover() {
    /** No-op for now (chart.js tooltips/hover are handled in lib) */
  }
}
