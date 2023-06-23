import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  public createPdf(element: HTMLElement, title: string) {
    if (element) {
      html2canvas(element).then((canvas: HTMLCanvasElement) => {
        const pdfFile = new jsPDF('l', 'px');
        const imgData = canvas.toDataURL('image/jpeg');
        const image = new Image();
        image.src = imgData;
        pdfFile.text(title, 200, 20);
        pdfFile.addImage(image, 'PNG', 10, 10, 255, 200);
        pdfFile.save(`${title}.pdf`);
      });
    }
  }
}
