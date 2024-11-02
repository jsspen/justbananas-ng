import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyDHb2jmIddvxYgBqkwO_RiFKLdhdYVhhUI',
  authDomain: 'justbananas-ng.firebaseapp.com',
  databaseURL: 'https://justbananas-ng-default-rtdb.firebaseio.com',
  projectId: 'justbananas-ng',
  storageBucket: 'justbananas-ng.firebasestorage.app',
  messagingSenderId: '833014059147',
  appId: '1:833014059147:web:fae97ebad6d4582ad3048e',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'just-bananas-fe';
}
