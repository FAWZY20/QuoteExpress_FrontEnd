import { ChangeDetectorRef, Component } from '@angular/core';
import { Devis } from 'src/app/modelData/devis';
import { map } from 'rxjs';
import { DevisTab } from 'src/app/modelData/devisTab';
import { DocxService } from 'src/app/service/docx.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  downloadLink: string | null = null;
  devis: Devis;
  currentDate: Date = new Date();
  quantite: boolean = true;
  tva: boolean = true;
  tvaLigne: boolean = false;
  tvaTaux: number = 20
  uniteValue: string = "€";
  unite: boolean = false;
  totalHt: number = 0;
  totalTva: number = 0;
  totalTTC: number = 0;

  donneeTab: DevisTab[] = [
    { id: 1, titre: '', description: '', quantite: 1, unite: '', prixUnitaire: 0, prixTotal: 0, tva: 20, affichage: false }
  ];

  constructor(
    private docxService: DocxService,
  ) {
    this.devis = new Devis();
  }

  calculPrixTotalHT(donne: any) {
    //prix total d'un element du devis
    let total = donne.quantite * donne.prixUnitaire;
    donne.prixTotal = total
  }

  calculPrixTotalDevisHT() {
    //prix total HT du devis 
    this.totalHt = 0;
    this.donneeTab.forEach((item: any) => {
      this.totalHt += item.quantite * item.prixUnitaire;
    });
    this.devis.totalHt = this.totalHt;
    return this.totalHt;
  }

  calculTva() {
    this.totalTva = this.totalHt * this.tvaTaux / 100;
    this.devis.tvaTotal = this.totalTva;
    return this.totalTva;
  }

  CalculTotalTTC() {
    this.totalTTC = this.totalHt + this.totalTva;
    this.devis.totalTtc = this.totalTTC;
    return this.totalTTC;
  }

  generateDevis(): void {
    this.devis.devisTab = this.donneeTab.slice();
    this.docxService.generateDocx(this.devis);
  }

  addColumn() {
    this.donneeTab.map(result => {
      result.affichage = true;
    })
    const nouvelleLigne = { id: this.donneeTab.length + 1, titre: '', description: '', quantite: 1, unite: '', prixUnitaire: 0, tva: 20, prixTotal: 0, affichage: false };
    this.donneeTab.push(nouvelleLigne);
    localStorage.setItem('mapData', JSON.stringify(this.donneeTab));
  }

  deleteColumn(id: number) {
    this.donneeTab.forEach(rst => {
      if (rst.id == id) {
        this.devis.totalHt = this.totalHt - rst.prixTotal;
      }
    })
    this.donneeTab = this.donneeTab.filter(resulte => resulte.id !== id);

  }

  addColumQuantite() {
    this.quantite = true;
  }


  deleteColumQuantite() {
    this.quantite = false;
  }

  addColumnUnite() {
    this.unite = true;
  }

  deleteColumnUnite() {
    this.unite = false;
  }

  addTva() {
    this.tva = true;
    console.log(this.tva);

  }

  deleteTva() {
    this.tva = false;
    console.log(this.tva);
  }


  addTvaLigne() {
    this.tvaLigne = true;
  }

  deleteTvaLigne() {
    this.tvaLigne = false;
  }

  changeUnitee(unitee: string): void {
    this.uniteValue = unitee;
    this.devis.moneyUnite = this.uniteValue;
    this.donneeTab.forEach(rst => {
      rst.unite = this.uniteValue
    })
  }

  changeTaux(taux: number): void {
    this.tvaTaux = taux;
    this.devis.tva = this.tvaTaux;
  }

}
