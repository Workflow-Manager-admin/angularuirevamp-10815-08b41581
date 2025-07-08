import { Component, Input, inject } from '@angular/core';
import { ChartType, ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, NgIf } from '@angular/common';

/*
PUBLIC_INTERFACE
DashboardChartComponent: Reusable chart component for dashboard sections.
Inputs:
  - type: 'line' | 'bar'      - Chart type
  - data: ChartData<'line' | 'bar'>           - Chart.js data config
  - options?: ChartOptions<'line' | 'bar'>    - Chart.js options config
  - height?: string                           - Height for canvas
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
        [height]="height || '90'">
      </canvas>
      <div *ngIf="!isBrowser" class="fake-chart" style="height:67px; margin-top:17px; border-radius:7px; background:linear-gradient(90deg, #f3f5fc 60%, #f5faff 100%); color:#b4bddb; display:flex; align-items:center; justify-content:center;">
        [Chart not available in server render]
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    canvas { max-width: 100%; }
  `]
})
export class DashboardChartComponent {
  @Input() type: 'line' | 'bar' = 'line';
  @Input() data!: ChartData<'line' | 'bar'>;
  @Input() options?: ChartOptions<'line' | 'bar'>;
  @Input() height: string = '90';

  isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  get chartOpts(): ChartOptions<'line' | 'bar'> {
    return { responsive: true, ...this.options };
  }
}
