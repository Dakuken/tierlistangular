import { Component, OnInit, TemplateRef } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { User } from '../models/User.model';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  email: string = ''
  constructor(private dialogService: NbDialogService) {

  }

  ngOnInit() {
  }

  openDialog(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }

}
