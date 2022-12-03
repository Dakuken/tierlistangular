import { Injectable } from '@angular/core';
import { ref, set } from 'firebase/database';
import { FireStoreService } from '../fire-store.service';

@Injectable({
  providedIn: 'root'
})
export class SaveProfService {

  constructor(private fireStoreService: FireStoreService) { }

  writeUserTierlis(userId: string) {
    set(ref(this.fireStoreService.db, '/tierlist/' + userId), {
      author: userId,
    });
  }
}
