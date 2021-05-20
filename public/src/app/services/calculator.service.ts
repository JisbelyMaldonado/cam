import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Arbitraje } from "app/interfaces/arbitraje";
import { arbitro } from "app/interfaces/arbitro";
import { Mediacion } from "app/interfaces/mediacion";

@Injectable({
  providedIn: "root",
})
export class CalculatorService {
  constructor(private db: AngularFirestore) {}

  public calcular(
    cuantiaValue: number,
    selectedValue: string,
    selectedValueArb: string,
    selectedCuantia: string,
    selectedSocio: string
  ) {
    if (selectedValue == "0") {
      if (selectedValueArb == "tres") {
        if (selectedCuantia == "0") {
          console.log("Entra a valor determinado");
          if (cuantiaValue > 1 && cuantiaValue < 5000) {
            console.log("1");
            return this.db
              .collection<arbitro>("Arbitro")
              .doc(`${selectedValueArb}`)
              .collection("1")
              .doc("rJ9DtqgqDPHLiVo1wxDy")
              .valueChanges();
          } else if (cuantiaValue > 5001 && cuantiaValue < 10000) {
            console.log("5001");
            return this.db
              .collection<arbitro>("Arbitro")
              .doc(`${selectedValueArb}`)
              .collection("5")
              .doc("fDl1Xv3KlU5iYlHB5egh")
              .valueChanges();
          } else if (cuantiaValue > 10001 && cuantiaValue < 20000) {
            return this.db
              .collection<arbitro>("Arbitro")
              .doc(`${selectedValueArb}`)
              .collection("10")
              .doc("OXYGqiTiwIXriUhlEFSw")
              .valueChanges();
          } else if (cuantiaValue > 20001 && cuantiaValue < 50000) {
            return this.db
              .collection<arbitro>("Arbitro")
              .doc(`${selectedValueArb}`)
              .collection("20")
              .doc("dhfUs1E6Nvw8U94l0DtY")
              .valueChanges();
          } else if (cuantiaValue > 50001 && cuantiaValue < 100000) {
            return this.db
              .collection<arbitro>("Arbitro")
              .doc(`${selectedValueArb}`)
              .collection("50")
              .doc("JrWDFzL5sLbuWjSa2Dki")
              .valueChanges();
          } else if (cuantiaValue > 100001 && cuantiaValue < 500000) {
            return this.db
              .collection<arbitro>("Arbitro")
              .doc(`${selectedValueArb}`)
              .collection("100")
              .doc("mMQviikTdoWrU1l86t2D")
              .valueChanges();
          } else if (cuantiaValue > 500001 && cuantiaValue < 1000000) {
            return this.db
              .collection<arbitro>("Arbitro")
              .doc(`${selectedValueArb}`)
              .collection("500")
              .doc("44gyutqpAPmOltClkwu9")
              .valueChanges();
          } else if (cuantiaValue > 1000000) {
            return this.db
              .collection<arbitro>("Arbitro")
              .doc(`${selectedValueArb}`)
              .collection("1000")
              .doc("jqCOQzxn3OOgvJCAM8TE")
              .valueChanges();
          }
        } else if (selectedCuantia == "1") {
          console.log("Entra a indeterminado");
          return this.db
            .collection<arbitro>("Arbitro")
            .doc(`${selectedValueArb}`)
            .collection("indeterminada")
            .doc("4mvglwzgNgWPQmnli51c")
            .valueChanges();
        }
      } else if (selectedValueArb == "unico") {
        console.log("arbitro unico");
        if (selectedCuantia == "0") {
          console.log("Entra a valor determinado");
          if (cuantiaValue > 1 && cuantiaValue < 5000) {
            console.log("1");
            return this.db
              .collection<arbitro>("Arbitro")
              .doc(`${selectedValueArb}`)
              .collection("1")
              .doc("ShDz1TyfdJy570zEt97q")
              .valueChanges();
          } else if (cuantiaValue > 5001 && cuantiaValue < 10000) {
            console.log("5001");
            return this.db
              .collection<arbitro>("Arbitro")
              .doc(`${selectedValueArb}`)
              .collection("5")
              .doc("Fc3bpnODqGO8iRBXNO5J")
              .valueChanges();
          } else if (cuantiaValue > 10001 && cuantiaValue < 20000) {
            return this.db
              .collection<arbitro>("Arbitro")
              .doc(`${selectedValueArb}`)
              .collection("10")
              .doc("Hj4kIxcgGPc8Mel0KfeR")
              .valueChanges();
          } else if (cuantiaValue > 20001 && cuantiaValue < 50000) {
            return this.db
              .collection<arbitro>("Arbitro")
              .doc(`${selectedValueArb}`)
              .collection("20")
              .doc("iB7UejneryIZSCdNnZlD")
              .valueChanges();
          } else if (cuantiaValue > 50001 && cuantiaValue < 100000) {
            return this.db
              .collection<arbitro>("Arbitro")
              .doc(`${selectedValueArb}`)
              .collection("50")
              .doc("dd3siAlFG0IvlvpgI1Yz")
              .valueChanges();
          } else if (cuantiaValue > 100001 && cuantiaValue < 500000) {
            return this.db
              .collection<arbitro>("Arbitro")
              .doc(`${selectedValueArb}`)
              .collection("100")
              .doc("q43b16L2lM0IjAT9hhw6")
              .valueChanges();
          } else if (cuantiaValue > 500001 && cuantiaValue < 1000000) {
            return this.db
              .collection<arbitro>("Arbitro")
              .doc(`${selectedValueArb}`)
              .collection("500")
              .doc("9yWz26xI89ytFJQbGb89")
              .valueChanges();
          } else if (cuantiaValue > 1000000) {
            return this.db
              .collection<arbitro>("Arbitro")
              .doc(`${selectedValueArb}`)
              .collection("1000")
              .doc("DTucdsJ4RRPkwjDG4lQn")
              .valueChanges();
          }
        } else if (selectedCuantia == "1") {
          console.log("Entra a indeterminado");
          return this.db
            .collection<arbitro>("Arbitro")
            .doc(`${selectedValueArb}`)
            .collection("indeterminada")
            .doc("ErUvgOxTsj5GeMOgSMiX")
            .valueChanges();
        }
      } else {
        console.log("no entra a unico");
      }
    } else {
      console.log("no entra a arbitraje");
    }
  }

  public calcularArbitraje(
    cuantiaValue: number,
    selectedValue: string,
    selectedValueArb: string,
    selectedCuantia: string,
    selectedSocio: string,
    arbitro: arbitro
  ) {
    if (selectedValueArb == "1") {
      console.log("1");
      return this.db
        .collection<arbitro>("Arbitro")
        .doc(`${selectedValueArb}`)
        .collection("indeterminada")
        .doc(`${arbitro.arb_unico_uid}`)
        .valueChanges();
    }
  }

  public calcularMediacion(
    cuantiaValue: number,
    selectedValue: string,
    selectedValueArb: string,
    selectedCuantia: string,
    selectedSocio: string,
    Mediacion: Mediacion
  ) {}
}
