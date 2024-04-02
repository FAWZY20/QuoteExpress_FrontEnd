import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  quantite: boolean = true;
  tva: boolean = true;
  tvaLigne: boolean = false;
  tvaTaux:string = "20"
  uniteValue: string = "€";
  unite: boolean = false;


  donneeTab: any[] = [
    { id: 1, titre: '', description: '', quantite:'1',unite:'' , prixUnitaire:'', tva:'20', prixTotal:'' }
  ]

  constructor(){}

  addColumn(){
    const nouvelleLigne = { id: this.donneeTab.length + 1, titre: '', description: '', quantite:'1',unite:'' , prixUnitaire:'', tva:'20', prixTotal:'' };
    this.donneeTab.push(nouvelleLigne);
  }

  deleteColumn(id:number){
    this.donneeTab = this.donneeTab.filter(resulte => resulte.id !== id);
  }

  addColumQuantite(){
    this.quantite = true;
  }

  
  deleteColumQuantite(){
    this.quantite= false;
  }

  addColumnUnite(){
    this.unite = true;
  }

  deleteColumnUnite(){
    this.unite = false;
  }

  addTva(){
  this.tva = true;
  console.log(this.tva);
  
  }

  deleteTva(){
    this.tva = false;
    console.log(this.tva);
  }


  addTvaLigne(){
    this.tvaLigne = true;
  }

  deleteTvaLigne(){
    this.tvaLigne = false;
  }

  changeUnitee(unitee: string): void{
    this.uniteValue = unitee;
  }

  changeTaux(taux: string): void{
    this.tvaTaux = taux;
  }
}
