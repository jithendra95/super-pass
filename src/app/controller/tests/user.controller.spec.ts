import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { of } from 'rxjs';
import { UserApi } from 'src/app/api/user.api';
import { User } from 'src/app/models/user.interface';
import { StateStore } from 'src/app/states/store.state';
import { environment } from 'src/environments/environment';
import { UserController } from '../user.controller';

describe('UserController', () => {
    let controller: UserController;
    let stateStore: StateStore;
    let userApi: UserApi;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AngularFireModule.initializeApp(environment.firebaseConfig),
                AngularFireDatabaseModule
            ],
            providers: [UserController,]
        });

        stateStore = TestBed.inject(StateStore);
        userApi = TestBed.inject(UserApi);
        controller = TestBed.inject(UserController);
    })


    it("Should create", () => {
        expect(controller).toBeDefined();
    })

    it("Should load user and set the state", () => {

        spyOn(stateStore, 'setState');
        spyOn(userApi, 'read').and.returnValue(of([new User()]));
        controller.load('');

        expect(userApi.read).toHaveBeenCalled();
        expect(stateStore.setState).toHaveBeenCalled();
    })
})







