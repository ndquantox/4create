import { Component, OnInit } from '@angular/core';
import { UserStore, UserState } from './../../stores/user.store';
import { UserQuery } from './../../queries/user.query';
import { EntityStore, EntityState } from '@datorama/akita';
import { User } from './../../models/user';
import { Observable, combineLatest, map, BehaviorSubject, Subject, startWith} from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  users$?: Observable<User[]>;
  test: User[];
  modalVisible: boolean = false
  userForm: FormGroup
  formSuccess: boolean = false;
  highestId: number;

  blockButton$:Observable<boolean>;
  highestId$:Observable<string>;

  constructor(private userStore: UserStore, private userQuery: UserQuery) {

  }

  ngOnInit(): void {
    this.loadUsers();
    this.users$ = this.userQuery.selectAll();
    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });

    this.blockButton$ = this.users$
     .pipe(
        map(users => users.length === 5 || users.some(user => user.active === false))
     );

    this.highestId$ = this.users$
    .pipe(
        map(users => users.map(x => +x.id).reduce((a, b) => a > b ? a : b, 0).toString())
    )
  }

  editUser(user: User) {
    let status = user.active ? false : true;
    this.userStore.update(user.id, {
      active: status
    });
  }

  loadUsers() {
    this.userStore.set(this.userQuery.getInitalUsers());
  }

  get controls() {
    return this.userForm.controls;
  }

  openModal(id: string) {
    this.highestId = parseInt(id);
    this.modalVisible = true;
  }

  closeModal() {
    this.modalVisible = false;
  }

  onEvent(event: any) {
    event.stopPropagation();
  }

  add() {
    
    let user: User = {
      "name": this.controls['name'].value,
      "id": this.highestId + 1,
      "active": false
    }

    this.userForm.reset();
    this.userStore.add(user);
    this.modalVisible = false;
  }
}
