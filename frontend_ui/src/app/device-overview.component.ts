import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-device-overview',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./device-overview.component.css'],
  template: `
    <section class="dashboard-card device-overview" aria-labelledby="device-overview-title">
      <div class="card-header">
        <span id="device-overview-title" class="card-title">Device Overview</span>
        <span class="device-image material-symbols-outlined" aria-hidden="true"
              [ngStyle]="{color: device?.status === 'Active' ? '#4669fa' : '#b4bddb'}"
              style="font-size:2.4rem;">
              {{ device?.icon || 'router' }}
        </span>
      </div>
      <div class="device-meta-responsive">
        <!-- COLUMN 1: Main Metadata -->
        <div class="meta-col">
          <div class="meta-row"><span class="device-label">Type:</span>
            <span class="device-value" title="Device Category">{{ device?.type }}</span></div>
          <div class="meta-row"><span class="device-label">IP Address:</span>
            <span class="device-value">
              {{ device?.ip }}
              <span class="mini-copy material-symbols-outlined" title="Copy IP" style="font-size:1.22rem; vertical-align:text-bottom; color:#2eb67d; cursor:pointer;">content_copy</span>
            </span></div>
          <div class="meta-row"><span class="device-label">MAC:</span>
            <span class="device-value with-tooltip">
              {{ device?.mac }}
              <span class="tooltip" title="Hardware Address">
                <span class="material-symbols-outlined info-icon">info</span>
              </span>
            </span>
          </div>
          <div class="meta-row"><span class="device-label">Location:</span>
            <span class="device-value">{{ device?.location }}</span>
          </div>
          <div class="meta-row"><span class="device-label">Uptime:</span>
            <span class="device-value">{{ device?.uptime }}</span>
          </div>
        </div>
        <!-- COLUMN 2: Status / Health / Version -->
        <div class="meta-col">
          <div class="meta-row">
            <span class="device-label">Status:</span>
            <span class="device-value status-dot-wrap">
              <span class="status-dot"
                [ngClass]="{'online': device?.status === 'Active', 'offline': device?.status !== 'Active'}"
                [attr.aria-label]="device?.status"
                title="Device is {{device?.status}}"></span>
                {{ device?.status }}
            </span>
          </div>
          <div class="meta-row">
            <span class="device-label">Health:</span>
            <span class="device-value">
              <span [ngClass]="{
                'good-health': device?.health === 'Good',
                'mediocre-health': device?.health === 'Warning',
                'bad-health': device?.health === 'Critical'
              }" class="health-dot" title="Health: {{device?.health}}"></span>
              {{ device?.health }}
              <span *ngIf="device?.healthInfo" class="health-tooltip">
                <span class="material-symbols-outlined info-icon" title="{{device?.healthInfo}}">info</span>
              </span>
            </span>
          </div>
          <div class="meta-row">
            <span class="device-label">Firmware:</span>
            <span class="device-value">
              {{ device?.firmware }}
              <span *ngIf="device?.fwUpdate" class="fw-update-indicator" title="Update available">
                <span class="material-symbols-outlined accent" style="vertical-align:middle;">system_update</span>
              </span>
            </span>
          </div>
          <div class="meta-row conn-row">
            <span class="device-label">Connections:</span>
            <span class="device-value">
              <span *ngFor="let t of device?.connectionsStats; let idx = index">
                <span class="conn-type" title="{{t.type}}"><span class="material-symbols-outlined" style="font-size:1.14rem">{{t.icon}}</span></span>
                <span class="conn-count">{{t.count}}</span>
                <span *ngIf="idx !== device?.connectionsStats.length-1" class="conn-sep">|</span>
              </span>
            </span>
          </div>
        </div>
        <!-- COLUMN 3: Usage/Progress/Actions -->
        <div class="meta-col meta-col-usage">
          <div class="meta-row">
            <span class="device-label">CPU:</span>
            <span class="device-progress-outer" [attr.title]="'CPU Load: ' + device?.cpu + '%'">
              <span class="device-progress-inner" [style.width.%]="device?.cpu"></span>
              <span class="device-value mini-progress-label">{{device?.cpu}}%</span>
            </span>
          </div>
          <div class="meta-row">
            <span class="device-label">Memory:</span>
            <span class="device-progress-outer" [attr.title]="'Memory Usage: ' + device?.memory + '%'">
              <span class="device-progress-inner mem" [style.width.%]="device?.memory"></span>
              <span class="device-value mini-progress-label">{{device?.memory}}%</span>
            </span>
          </div>
          <div class="meta-row">
            <span class="device-label">Disk:</span>
            <span class="device-progress-outer" [attr.title]="'Disk Usage: ' + device?.disk + '%'">
              <span class="device-progress-inner disk" [style.width.%]="device?.disk"></span>
              <span class="device-value mini-progress-label">{{device?.disk}}%</span>
            </span>
          </div>
          <div class="meta-row meta-actions-row">
            <button class="device-action-btn restart" aria-label="Restart device" title="Restart Device">
              <span class="material-symbols-outlined">restart_alt</span>
              <span class="action-label">Restart</span>
            </button>
            <button class="device-action-btn config" aria-label="Configure device" title="Configure">
              <span class="material-symbols-outlined">tune</span>
              <span class="action-label">Configure</span>
            </button>
            <button class="device-action-btn export" aria-label="Export device data" title="Export Data">
              <span class="material-symbols-outlined">download</span>
              <span class="action-label">Export</span>
            </button>
          </div>
        </div>
      </div>
      <div class="device-adv-info">
        <span>
          <span class="material-symbols-outlined" aria-hidden="true" style="font-size:1.24rem;color:#8f59ff;vertical-align:text-bottom;">update</span>
          <span class="device-label">Last updated:</span>
          <span class="device-value">{{ device?.lastUpdated }}</span>
        </span>
        <span class="adv-field" [attr.title]="'Serial #: ' + device?.serial">
          <span class="device-label">Serial #:</span>
          <span class="device-value">{{ device?.serial }}</span>
        </span>
        <span class="adv-field" *ngIf="device?.notes" [attr.title]="device?.notes">
          <span class="material-symbols-outlined accent" style="font-size:1em;vertical-align:middle;">note</span>
          <span class="device-label">Notes:</span>
          <span class="device-value">{{ device?.notes }}</span>
        </span>
      </div>
    </section>
  `
})
export class DeviceOverviewComponent {
  @Input() device: any;
}
