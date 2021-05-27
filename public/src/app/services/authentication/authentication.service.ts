import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public infoUser: any;
  constructor(private db: AngularFirestore,
    public dbAuth: AngularFireAuth,
    private router: Router) { }

    public async login(email: string, password: string) {
      // console.log('******SERVICE**********',email,password);
      
      try {
        const result = await this.dbAuth.signInWithEmailAndPassword(
          email,
          password
        );
        // console.log(result);
        
        let user_info: any;
        user_info = (await this.getUserByUid(result.user.uid)).pipe(take(1))
          .toPromise();
          // console.log(user_info);
          
        if (await user_info) {
          var infoUser = {
            email: (await user_info)["user_email"],
            type_user: (await user_info)["user_type_account_int"],
          };
        }
        localStorage.setItem("infoUser", JSON.stringify(infoUser));
        this.infoUser = JSON.parse(localStorage.getItem("infoUser"));
        if (this.infoUser.type_user == 1) {
          $('#myLargeModalLabel').modal('hide')
  
          this.router.navigate(['/adminBlog'])
        }  else if (this.infoUser.type_user === undefined) {
          this.router.navigate([''])
        }
  
      } catch (error) {
        if (error.code === 'auth/wrong-password') {
          this.showNotification('bottom', 'center', 'La contraseña no es válida o el usuario no tiene una contraseña', 'warning')
  
        }
        if (error.code === 'auth/user-not-found') {
          this.showNotification('bottom', 'center', 'No hay registro de usuario correspondiente a este email. El usuario pudo haber sido eliminado', 'warning')
  
        }
        if (error.code === 'auth/invalid-email') {
          this.showNotification('bottom', 'center', 'El email no tiene un formato válido.', 'warning')
        }
        if (error.code === 'auth/too-many-requests') {
          this.showNotification('bottom', 'center', 'Atención, Demasiados intentos de inicio de sesión fallidos.', 'warning')
        }
      }
    }
  
  
    public showNotification(from, align, msg, type) {
      $.notify({
        message: "<b>" + msg + "</b> "
      }, {
        type: type,
        class: 'notify',
        timer: 5000,
        placement: {
          from: from,
          align: align
        }
      });
    }
  
    public async logout() {
      await this.dbAuth.signOut();
      localStorage.clear()
      this.router.navigate([''])
    }
  
    public getUserByUid(uid: string) {
      // console.log(uid);
      
      let result = this.db.collection("users").doc(`${uid}`).valueChanges();
      return result
    }
}
