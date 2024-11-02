import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { getDatabase, ref, set, onValue, remove } from 'firebase/database';
import { initializeApp } from 'firebase/app';

interface Item {
  id: string;
  name: string;
  quantity: number;
  store?: string;
  notes?: string;
  complete: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'just-bananas-fe';
  items: Item[] = [];

  firebaseConfig = {
    apiKey: 'AIzaSyDHb2jmIddvxYgBqkwO_RiFKLdhdYVhhUI',
    authDomain: 'justbananas-ng.firebaseapp.com',
    databaseURL: 'https://justbananas-ng-default-rtdb.firebaseio.com',
    projectId: 'justbananas-ng',
    storageBucket: 'justbananas-ng.firebasestorage.app',
    messagingSenderId: '833014059147',
    appId: '1:833014059147:web:fae97ebad6d4582ad3048e',
  };

  constructor() {
    initializeApp(this.firebaseConfig);
  }

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    const db = getDatabase();
    const itemsRef = ref(db, 'items');

    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      this.items = data ? Object.values(data) : [];
    });
  }

  addItem(event: Event) {
    event.preventDefault();
    const itemName = (document.getElementById('item-name') as HTMLInputElement)
      .value;
    const quantity = (document.getElementById('quantity') as HTMLInputElement)
      .value;
    const store =
      (document.getElementById('store') as HTMLInputElement).value || 'Any';
    const notes = (document.getElementById('notes') as HTMLInputElement).value;

    const newItem = {
      id: new Date().getTime().toString(),
      name: itemName,
      quantity: Number(quantity),
      store,
      notes,
      complete: false,
    };

    const db = getDatabase();
    // Use timestamp as unique item key
    const itemsRef = ref(db, 'items/' + new Date().getTime());

    set(itemsRef, newItem).then(() => {
      // Clear form after submission
      (document.getElementById('item-form') as HTMLFormElement).reset();
    });
  }

  // Clear out completed (checked) items when button pushed
  clearCompleted() {
    const db = getDatabase();
    const itemsRef = ref(db, 'items');

    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      const items: Item[] = data ? Object.values(data) : [];

      items.forEach((item) => {
        if (item.complete) {
          remove(ref(db, 'items/' + item.id));
        }
      });
    });
  }

  // Filter by store
}
