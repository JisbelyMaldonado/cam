import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor(private db: AngularFirestore) {

  

   }

   
public calcular( 
  cuantiaValue:number,
  selectedValue: string,
  selectedValueArb: string,
  selectedCuantia: string,
  selectedSocio: string,

){
  console.log( selectedValue,
    selectedValueArb,
    selectedCuantia,
    selectedSocio,
    cuantiaValue,

  )
}

}
