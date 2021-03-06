import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormGroup } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { EventsComponent } from './events/events.component';
import { SpecialEventsComponent } from './special-events/special-events.component';
import { AuthService } from './auth.service';
import { EventService } from './event.service';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { AdminComponent } from './admin/admin.component';
import { FormBuilder } from '@angular/forms';
import { FormcontrolValidationMsgDirective } from './formcontrol-validation-msg.directive';
import { FormsubmitValidationMsgDirective } from './formsubmit-validation-msg.directive';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { IgxTimePickerModule } from 'igniteui-angular';
import { ResultsComponent } from './results/results.component';

@NgModule({
	declarations: [
		AppComponent,
		RegisterComponent,
		LoginComponent,
		EventsComponent,
		SpecialEventsComponent,
		HomeComponent,
		AboutComponent,
		ContactComponent,
		AdminComponent,
		FormcontrolValidationMsgDirective,
		FormsubmitValidationMsgDirective,
    UserprofileComponent,
    ResultsComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DateTimePickerModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center'
    }),
    GooglePlaceModule,
    CommonModule
  ],
  providers: [AuthService, AuthGuard, EventService, LoginComponent, AdminComponent, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
	
})
export class AppModule {
}
