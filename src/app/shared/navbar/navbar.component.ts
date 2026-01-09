import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonFooter,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonLabel
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [
    IonFooter,
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon
],
})
export class NavbarComponent { }
