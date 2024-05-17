import { DevisTab } from "./devisTab";

export class Devis{

    societe!:string;
    adresseSociete!:string;
    codePostalSociete!:string;
    villeSociete!:string;
    siretSociete!:string;
    tvaSociete!:string;
    telSociete!:string;
    nomClient!:string;
    adresseClient!:string;
    codePostalClient!:string;
    villeClient!:string;
    siretClient!:string;
    telClient!:string;
    dateDevis!:string;
    infoDevis!: any[];
    totalHt!:number;
    tva: number = 20;
    totalTtc!:number;
    tvaTotal!: number;
    devisTab: DevisTab[] = [];
    moneyUnite: String = "€";
    info!: String;

}