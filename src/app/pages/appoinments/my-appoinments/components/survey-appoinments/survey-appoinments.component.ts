import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Question, Survey } from 'src/app/models/survey.model';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-survey-appoinments',
  templateUrl: './survey-appoinments.component.html',
  styleUrls: ['./survey-appoinments.component.scss'],
})
export class SurveyAppoinmentsComponent {
  protected formSurvey: FormGroup;
  protected optionExperience: number[];
  protected optionGame: string[];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly alertService: AlertService
  ) {
    this.optionExperience = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    this.optionGame = [
      'Adivina el numero',
      'Ahorcado',
      'Preguntados',
      'Mayor o Menor',
    ];
    this.formSurvey = this.formBuilder.group({
      experience: ['', [Validators.required, Validators.minLength(1)]],
      preference: ['', [Validators.required, Validators.minLength(1)]],
      find: ['', Validators.required],
    });
  }
  public sendSurvey() {
    try {
      this.validateForm();
      //guardar encuesta
      this.alertService.showAlert({
        icon: 'success',
        message: 'Registro completado con exito, gracias por participar',
      });
    } catch (error: any) {
      this.alertService.showAlert({
        icon: 'error',
        message: error.message,
      });
    }
    this.formSurvey.reset();
  }
  private getSurvey() {
    return new Survey({
      date: new Date(),
      questions: this.getQuestions(),
    });
  }

  private getQuestions() {
    const questions: Question[] = [
      new Question({
        question: 'Experiencia',
        response: this.formSurvey.controls['experience'].value,
      }),
      new Question({
        question: 'Juego Preferido',
        response: this.formSurvey.controls['preference'].value,
      }),
      new Question({
        question: 'Donde nos encontraste',
        response: this.formSurvey.controls['find'].value,
      }),
    ];

    return questions;
  }

  private validateForm() {
    if (this.formSurvey.invalid) {
      throw new Error('Debe completar los datos para el registro');
    }
  }
}
