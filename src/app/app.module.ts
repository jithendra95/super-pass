import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireDatabaseModule } from "@angular/fire/compat/database";
import { AuthGuard, LoginAuthGuard } from './auth-guard';
import { MenuComponent } from './ui-elements/menu/menu.component';
import { SharedModule } from './shared/shared.module';
import { ConsoleComponent } from './components/console/console.component';
import { LoginModule } from './components/login/login.module';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ConsoleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    SharedModule,
    LoginModule
  ],
  providers: [AuthGuard, LoginAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
