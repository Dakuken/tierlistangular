import { Injectable } from '@angular/core';
import { ref, set } from 'firebase/database';
import { Prof } from 'src/app/interface/Prof.interface';
import { ProfService } from './prof-service.service';

@Injectable({
  providedIn: 'root'
})
export class SaveProfService {

  constructor(private profService: ProfService) { }

  writeUserTierlis(userId: string) {
    set(ref(this.profService.db, '/tierlist/' + userId), {
      author: userId,
    });
  }
}
