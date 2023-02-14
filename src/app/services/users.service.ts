import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../models/User.model';
import { getDatabase, set, ref, get, child } from "firebase/database";

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  constructor() { }
  getPseudo(){


  }

}
