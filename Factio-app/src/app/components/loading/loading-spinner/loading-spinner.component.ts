import { Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { LoadingService } from 'src/app/api/_services/loading.service';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent implements OnInit {


  loading$ = this.loader.loading$;
  constructor(
    public loader: LoadingService
  ) { }

  ngOnInit(): void {
  }

}
