import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VaultModule } from './vault/vault.module';
import { UiElementsModule } from './ui-elements/ui-elements.module';
import { PasswordModule } from './password/password.module';
import { ClipboardModule } from 'ngx-clipboard';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { LoginModule } from './login/login.module';
import { AuthGuard } from './auth-guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    ClipboardModule,
    UiElementsModule,
    VaultModule,
    PasswordModule,
    LoginModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
