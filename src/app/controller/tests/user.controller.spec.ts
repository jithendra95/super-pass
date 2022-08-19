import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { of } from 'rxjs';
import { UserApi } from 'src/app/api/user.api';
import { User } from 'src/app/models/user.interface';
import { StateStore } from 'src/app/states/store.state';
import { environment } from 'src/environments/environment';
import { BaseController } from '../base.controller';
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

        spyOn(Object.getPrototypeOf(stateStore), 'setState');
        spyOn(Object.getPrototypeOf(userApi), 'read').and.returnValue(of([new User()]));
        controller.load('');

        expect(Object.getPrototypeOf(userApi).read).toHaveBeenCalled();
        expect(Object.getPrototypeOf(stateStore).setState).toHaveBeenCalled();
    })

    it("Should create secret key when creating new user", ()=>{
        spyOn(Object.getPrototypeOf(Object.getPrototypeOf(controller)), "createWithId");
        let user = new User();
        controller.createWithId("someID", user);
        expect(user.secret !== "").toBeTrue();
        expect(BaseController.prototype.createWithId).toHaveBeenCalled();
    })
})







