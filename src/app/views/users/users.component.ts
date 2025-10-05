import { ToastrService } from 'ngx-toastr';
import { UsersService } from './users.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public users: User[];
  public userToDelete;

  constructor(
    private userService: UsersService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {
    // this.users = userService.getUsers();
  }

  ngOnInit() {
    this.userService.getUsers().subscribe((results) => {
      this.users = results;
    });
  }

  deleteUser(content, user: User) {
    this.userToDelete = user.name;
    this.modalService.open(content).result.then((res) => {
      if (res === 'ok') {
        this.userService.deleteUser(user.id).subscribe((result) => {
          this.toastr.success('Utente Eliminato');
          const indexUser = this.users.indexOf(user);
          this.users.splice(indexUser, 1);
        });
      }
    });
  }
}
