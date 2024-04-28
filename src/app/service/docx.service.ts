import { Injectable } from '@angular/core';
import { Packer, Document, Paragraph, TextRun } from "docx";
import { Devis } from '../modelData/devis';


@Injectable({
  providedIn: 'root'
})
export class DocxService {

  constructor() { }

  generateDocx(devis: Devis) {
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: `${devis.societe}`,
                break: 1
              }),
              new TextRun({
                text: `${devis.adresseSociete}`,
                break: 1
              }),
              new TextRun({
                text: `${devis.codePostalSociete}`,
                break: 1
              }),
              new TextRun({
                text: `${devis.villeSociete}`,
                break: 1
              }),
              new TextRun({
                text: `Siret:${devis.siretSociete}`,
                break: 1
              }),
              new TextRun({
                text: `N° TVA :${devis.tvaSociete}`,
                break: 1
              }),
              new TextRun({
                text: `Tél :${devis.telSociete}`,
                break: 1
              }),
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `${devis.nomClient}`,
                break: 1
              }),
              new TextRun({
                text: `${devis.adresseClient}`,
                break: 1
              }),
              new TextRun({
                text: `${devis.codePostalClient}`,
                break: 1
              }),
              new TextRun({
                text: `${devis.villeClient}`,
                break: 1
              }),
              new TextRun({
                text: `Siret :${devis.siretClient}`,
                break: 1
              }),
              new TextRun({
                text: `Tél :${devis.telClient}`,
                break: 1
              }),
            ]
          }),
        ]
      }]
    });

    Packer.toBlob(doc).then(blob => {
      // Télécharger le fichier DOCX
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.href = url;
      a.download = "Devis.docx";
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    });

  }

}
