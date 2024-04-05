import { ChangeDetectorRef, Component } from '@angular/core';
import { Devis } from 'src/app/modelData/devis';
import { map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  devis: Devis;
  quantite: boolean = true;
  tva: boolean = true;
  tvaLigne: boolean = false;
  tvaTaux: number = 20
  uniteValue: string = "€";
  unite: boolean = false;
  totalHt: number = 0;
  totalTva:number = 0;

  donneeTab: any[] = [
    { id: 1, titre: '', description: '', quantite: 1, unite: '', prixUnitaire: 0, prixTotal: 0, tva: 20 }
  ];

  constructor() {
    this.devis = new Devis();
  }

  calculPrixTotalHT(donne: any) {
    let total = donne.quantite * donne.prixUnitaire;
    donne.prixTotal = total
  
    this.totalHt = 0;

    this.donneeTab.forEach((item: any) => {
      this.totalHt += item.prixTotal;
    });
  }

  calculTva(){
    this.totalTva = this.totalHt * this.tvaTaux /100
  }

  onSubmit(): void {

  }

  addColumn() {
    const nouvelleLigne = { id: this.donneeTab.length + 1, titre: '', description: '', quantite: 1, unite: '', prixUnitaire: 0, tva: 20, prixTotal: 0 };

    this.donneeTab.push(nouvelleLigne);
  
    localStorage.setItem('mapData', JSON.stringify(this.donneeTab));
  }

  deleteColumn(id: number) {
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
  }

  changeTaux(taux: number): void {
    this.tvaTaux = taux;
  }

}
