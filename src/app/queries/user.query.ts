import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { UserState, UserStore } from '../stores/user.store';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class UserQuery extends QueryEntity<UserState, User> {
    constructor(protected store: UserStore) {
        super(store);
    }

    getInitalUsers() {
        return this.getValue()['users'];
    }
}