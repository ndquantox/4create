import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { User } from '../models/user';
import { Injectable } from '@angular/core';

export interface UserState extends EntityState<User> { }

const initialState = {
    users: [
        {
          id: 1,
          name: 'John Simmons',
          active: false
        },
        {
          id: 2,
          name: 'Mark Dunn',
          active: false
        },
        {
          id: 3,
          name: 'Terry Parker',
          active: false
        },
    ]
};

@Injectable({
    providedIn: 'root'
})

@StoreConfig({name: 'users'})
export class UserStore extends EntityStore<UserState, User> {
    constructor() {
        super(initialState);
    }
}