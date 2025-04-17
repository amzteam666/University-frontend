import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {

  chartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  
  basicChartLabels = ['Universities', 'Courses', 'Students'];
  basicChartData: ChartData<'bar'> = {
    labels: this.basicChartLabels,
    datasets: [
      {
        data: [4, 8, 8],
        label: 'Counts',
        backgroundColor: ['#396EA3', '#F29F4F', '#228B22'],
      },
    ],
  };

    universityLabels = ['FAST-NUCES', 'UOK', 'NED', 'MAJU', 'LUMS'];
  universityChartData: ChartData<'bar'> = {
    labels: this.universityLabels,
    datasets: [
      {
        data: [6, 4, 7, 4, 7],
        label: 'Courses',
        backgroundColor: '#F29F4F',
      },
      {
        data: [12, 8, 10, 11, 10],
        label: 'Students',
        backgroundColor: '#228B22',
      },
    ],
  };
}
