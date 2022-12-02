import { Injectable } from '@angular/core';
import { getDatabase, ref } from 'firebase/database'
import { Subject } from 'rxjs';
import { Prof } from 'src/app/interface/Prof.interface';
@Injectable({
  providedIn: 'root'
})
export class ProfService {
  db = getDatabase();
  dbRef = ref(this.db);

}
