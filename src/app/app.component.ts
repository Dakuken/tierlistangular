import { FirebaseApp, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Component, OnInit } from '@angular/core';
import { collection, getDocs, getFirestore, addDoc, Firestore } from "firebase/firestore";
import { FireStoreService } from "./services/fire-store.service";
import { ListService } from "./services/list.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // app: FirebaseApp

  constructor(private FireStoreService: FireStoreService, private listeSercice: ListService) {
  }
}


