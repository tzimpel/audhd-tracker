import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonTextarea,
  IonTitle,
  IonToggle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { addOutline, arrowDownOutline, arrowUpOutline, closeOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { CompleteOnboardingUseCase } from '../application/onboarding/complete-onboarding.use-case';
import { LoadOnboardingStateUseCase } from '../application/onboarding/load-onboarding-state.use-case';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
  imports: [
    NgFor,
    NgIf,
    FormsModule,
    IonButton,
    IonContent,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonNote,
    IonTextarea,
    IonTitle,
    IonToggle,
    IonToolbar,
  ],
})
export class OnboardingPage implements OnInit {
  private readonly loadOnboardingState = inject(LoadOnboardingStateUseCase);
  private readonly completeOnboarding = inject(CompleteOnboardingUseCase);
  private readonly router = inject(Router);

  warningSigns: string[] = [];
  newWarningSign = '';
  essentialTasksText = '';
  essentialCareText = '';
  supportActionsText = '';
  reducedStimulusMode = false;
  isSaving = false;

  constructor() {
    addIcons({ addOutline, arrowUpOutline, arrowDownOutline, closeOutline });
  }

  async ngOnInit(): Promise<void> {
    const onboardingState = await this.loadOnboardingState.execute();

    this.warningSigns = onboardingState.warningSigns.map((warningSign) => warningSign.label);
    this.essentialTasksText = onboardingState.recoveryPlan.essentialTasks.join('\n');
    this.essentialCareText = onboardingState.recoveryPlan.essentialCare.join('\n');
    this.supportActionsText = onboardingState.recoveryPlan.supportActions.join('\n');
    this.reducedStimulusMode = onboardingState.settings.reducedStimulusMode;
  }

  addWarningSign(): void {
    const warningSign = this.newWarningSign.trim();

    if (!warningSign) {
      return;
    }

    this.warningSigns = [...this.warningSigns, warningSign];
    this.newWarningSign = '';
  }

  removeWarningSign(index: number): void {
    this.warningSigns = this.warningSigns.filter((_, currentIndex) => currentIndex !== index);
  }

  moveWarningSignUp(index: number): void {
    if (index === 0) {
      return;
    }

    this.warningSigns = this.swapWarningSigns(index, index - 1);
  }

  moveWarningSignDown(index: number): void {
    if (index >= this.warningSigns.length - 1) {
      return;
    }

    this.warningSigns = this.swapWarningSigns(index, index + 1);
  }

  async finishSetup(): Promise<void> {
    this.isSaving = true;

    await this.completeOnboarding.execute({
      reducedStimulusMode: this.reducedStimulusMode,
      warningSigns: this.warningSigns,
      essentialTasks: this.parseLines(this.essentialTasksText),
      essentialCare: this.parseLines(this.essentialCareText),
      supportActions: this.parseLines(this.supportActionsText),
    });

    await this.router.navigateByUrl('/home');
  }

  private parseLines(value: string): string[] {
    return value
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
  }

  private swapWarningSigns(fromIndex: number, toIndex: number): string[] {
    const warningSigns = [...this.warningSigns];
    const [warningSign] = warningSigns.splice(fromIndex, 1);
    warningSigns.splice(toIndex, 0, warningSign);
    return warningSigns;
  }
}
