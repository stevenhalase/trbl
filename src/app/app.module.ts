import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { APIService } from './services/api/api.service';
import { AuthService } from './services/auth/auth.service';
import { LocationService } from './services/location/location.service';

import { DistanceFilterPipe } from './pipes/distance-filter/distance-filter.pipe';
import { OrderByDatePipe } from './pipes/order-by-date/order-by-date.pipe';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LogoComponent } from './components/logo/logo.component';
import { NotificationComponent } from './components/notification/notification.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { Routing, AppRoutingProviders } from './app.routes';
import { ProfileComponent } from './profile/profile.component';
import { FeedComponent } from './components/feed/feed.component';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { PostComponent } from './components/post/post.component';
import { PeopleListComponent } from './components/people-list/people-list.component';
import { StaticMapComponent } from './components/static-map/static-map.component';
import { HeroComponent } from './components/hero/hero.component';
import { DistanceFilterTabsComponent } from './components/distance-filter-tabs/distance-filter-tabs.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LogoComponent,
    NotificationComponent,
    SignInComponent,
    NavigationComponent,
    HomeComponent,
    ProfileComponent,
    FeedComponent,
    ProfileFormComponent,
    PostComponent,
    PeopleListComponent,
    DistanceFilterPipe,
    OrderByDatePipe,
    StaticMapComponent,
    HeroComponent,
    DistanceFilterTabsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Routing
  ],
  providers: [
    APIService,
    AuthService,
    LocationService,
    AppRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
