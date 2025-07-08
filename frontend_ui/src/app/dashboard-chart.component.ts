import { Component, Input, inject } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, NgIf } from '@angular/common';

/*
PUBLIC_INTERFACE
DashboardChartComponent: Reusable chart component for dashboard sections.
Inputs:
  - type: 'line' | 'bar'      - Chart type
  - data: ChartData<'line' | 'bar'>           - Chart.js data config
  - options?: ChartOptions<'line' | 'bar'>    - Chart.js options config
  - height?: string | number                  - Height for canvas
Features:
  - Modern pastel palette, Inter font, round corner cards.
  - Smooth animation, responsive, custom tooltips, legend.
  - Stacked bar/category support (content usage).
*/

@Component({
  selector: 'app-dashboard-chart',
  standalone: true,
  imports: [NgChartsModule, NgIf],
  template: `
    <div class="dashboard-chart-wrapper">
      <canvas
        *ngIf="isBrowser"
        baseChart
        [type]="type"
        [data]="data"
        [options]="chartOpts"
        [height]="height || 90"
        class="dashboard-chart-canvas"
      ></canvas>
      <div *ngIf="!isBrowser" class="dashboard-fake-chart">
        [Chart not available in server render]
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-width: 0;
      width: 100%;
    }
    .dashboard-chart-wrapper {
      width: 100%;
      height: auto;
      background: var(--color-card-bg, #fff);
      border-radius: var(--radius-card-inner, 12px);
      box-shadow: var(--shadow-card);
      padding: var(--space-3) var(--space-3) var(--space-1) var(--space-3);
      transition: background .18s;
      min-height: 94px;
    }
    .dashboard-chart-canvas {
      max-width: 100%;
      width: 100%;
      height: auto;
      border-radius: var(--radius-card-inner, 12px);
      box-shadow: 0 1.5px 8px #aec9fa18;
      background: transparent;
      font-family: var(--font-main), sans-serif;
      transition: box-shadow .16s;
    }
    .dashboard-fake-chart {
      height: 67px;
      margin-top: 17px;
      border-radius: var(--radius-field, 8px);
      background: var(--pastel-bg-gradient,linear-gradient(90deg, #f3f5fc 60%, #f5faff 100%));
      color: #b4bddb;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--font-label);
      letter-spacing: 0.01em;
    }
  `]
})
export class DashboardChartComponent {
  @Input() type: 'line' | 'bar' = 'line';
  @Input() data!: ChartData<'line' | 'bar'>;
  @Input() options?: ChartOptions<'line' | 'bar'>;
  @Input() height: string | number = '90';

  isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  get chartOpts(): ChartOptions<'line' | 'bar'> {
    // Merge/respect incoming options, but always keep modern, visually smooth style
    return {
      responsive: true,
      animation: {
        duration: 950,
        easing: 'easeInOutCubic'
      },
      layout: {
        padding: {
          left: 5, right: 10, top: 7, bottom: 0
        }
      },
      plugins: {
        legend: {
          display: !!(this.options?.plugins?.legend?.display),
          position: (this.options?.plugins?.legend as any)?.position || 'top',
          labels: {
            font: { family: 'Inter', weight: 600, size: 13 },
            color: '#4669fa',
            usePointStyle: true,
            padding: 14
          },
          ...((this.options?.plugins?.legend || {}))
        },
        tooltip: {
          enabled: true,
          mode: 'nearest',
          backgroundColor: 'rgba(70,105,250,0.97)',
          borderColor: '#fff',
          borderWidth: 1.2,
          titleColor: '#fff',
          bodyColor: '#e6ecff',
          padding: 12,
          displayColors: true,
          caretPadding: 8,
          cornerRadius: 7,
          usePointStyle: true,
          titleFont: { family: 'Inter', weight: 600, size: 13 },
          bodyFont: { family: 'Inter', weight: 500, size: 14 },
          callbacks: this.options?.plugins?.tooltip?.callbacks || {}
        },
        ...(this.options?.plugins || {})
      },
      elements: {
        line: { tension: 0.35, borderWidth: 3, borderCapStyle: 'round', borderJoinStyle: 'round' },
        point: { radius: 5, borderWidth: 2, hoverRadius: 8, backgroundColor: '#fff', borderColor: '#4669fa' },
        bar: { borderRadius: 9, backgroundColor: '#b4bddb' }
      },
      hover: { mode: 'nearest', intersect: true },
      maintainAspectRatio: false,
      ...this.options
    };
  }
}
