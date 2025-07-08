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
    <div style="width:100%;height:auto;">
      <canvas
        *ngIf="isBrowser"
        baseChart
        [type]="type"
        [data]="data"
        [options]="chartOpts"
        [height]="height || 90"
        style="font-family:'Inter',sans-serif;border-radius:10px;"
      ></canvas>
      <div *ngIf="!isBrowser" class="fake-chart" style="height:67px; margin-top:17px; border-radius:7px; background:linear-gradient(90deg, #f3f5fc 60%, #f5faff 100%); color:#b4bddb; display:flex; align-items:center; justify-content:center;">
        [Chart not available in server render]
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    canvas { max-width: 100%; border-radius: 9px;}
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
