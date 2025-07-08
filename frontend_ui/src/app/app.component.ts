/* global window */
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardChartComponent } from './dashboard-chart.component';
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
    type: 'Wi-Fi Gateway',
    status: 'Active',
    location: 'Building A, Floor 2',
    lastUpdated: 'Just now'
  };
  quickStats = {
    online: 12,
    offline: 2,
    alerts: 1
  };

  // Demo chart data (interactively update as needed)
  lineChartData: ChartData<'line'> = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [110, 135, 130, 120, 150, 160, 170],
        label: 'Packets',
        borderColor: '#4669fa',
        backgroundColor: 'rgba(70,105,250,0.13)',
        pointBackgroundColor: '#4669fa',
        tension: 0.35,
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
      legend: { display: false },
      tooltip: { enabled: true }
    },
    elements: {
      point: { radius: 5, hoverRadius: 7, borderWidth: 2 }
    },
    scales: { x: {}, y: { beginAtZero: true } }
  };
  stackedBarOptions: ChartOptions<'bar'> = {
    plugins: {
      legend: {
        display: true,
        labels: { color: '#2d3958' }
      },
      tooltip: { enabled: true }
    },
    scales: {
      x: { stacked: true },
      y: { stacked: true, beginAtZero: true }
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
