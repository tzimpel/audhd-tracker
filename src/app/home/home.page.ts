import { Component, OnInit, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { HomeSummary, LoadHomeSummaryUseCase } from '../application/home/load-home-summary.use-case';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [NgIf, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage implements OnInit {
  protected readonly loadHomeSummary = inject(LoadHomeSummaryUseCase);
  summary: HomeSummary | null = null;

  async ngOnInit(): Promise<void> {
    this.summary = await this.loadHomeSummary.execute();
  }
}
