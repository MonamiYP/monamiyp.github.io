import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plot-sine',
  templateUrl: './plot-sine.component.html'
})
export class PlotSineComponent implements OnInit {
  frequency = 1;
  graph: any;

  ngOnInit(): void {
    this.updateGraph();
  }

  generateData(freq: number) {
    const x = Array.from({ length: 100 }, (_, i) => i / 10);
    const y = x.map(val => Math.sin(freq * val));
    return { x, y };
  }

  updateGraph() {
    const { x, y } = this.generateData(this.frequency);

    this.graph = {
      data: [
        {
          x,
          y,
          type: 'scatter',
          mode: 'lines',
          line: { color: '#1f77b4' },
          name: `Sine Wave (f=${this.frequency})`
        }
      ],
      layout: {
        title: 'Sine Wave',
        xaxis: { title: 'x' },
        yaxis: { title: 'sin(f·x)' },
        margin: { t: 40 }
      }
    };
  }
}
