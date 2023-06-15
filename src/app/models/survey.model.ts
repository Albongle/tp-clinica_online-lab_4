export class Survey {
  date: Date;
  age: number;
  questions: Question[];

  constructor(survey: { date: Date; questions: Question[] }) {
    this.date = survey.date;
    this.questions = survey.questions;
  }
}

export class Question {
  question: string;
  response: string;

  constructor(question: { question: string; response: string }) {
    this.question = question.question;
    this.response = question.response;
  }
}
