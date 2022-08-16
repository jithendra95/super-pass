import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { Observable, of } from 'rxjs';
import { StateStore } from 'src/app/states/store.state';
import { environment } from 'src/environments/environment';
import { MockApi, MockController, MockObject } from './mock.data';

describe('UserController', () => {
    let controller: MockController;
    let stateStore: StateStore;
    let api: MockApi;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AngularFireModule.initializeApp(environment.firebaseConfig),
                AngularFireDatabaseModule
            ],
            providers: [MockController]
        });

        stateStore = TestBed.inject(StateStore);
        api = TestBed.inject(MockApi);
        controller = TestBed.inject(MockController);
    })


    it("Should create", () => {
        expect(controller).toBeDefined();
    })

    it("Should load value and set the state", () => {

        spyOn(stateStore, 'setState');
        spyOn(api, 'read').and.returnValue(of([new MockObject()]));
        controller.load('');

        expect(api.read).toHaveBeenCalled();
        expect(stateStore.setState).toHaveBeenCalled();
    })

    it("Should load all values and set the state", () => {

        spyOn(stateStore, 'setState');
        spyOn(api, 'read').and.returnValue(of([new MockObject()]));
        controller.loadAll('');

        expect(api.readAll).toHaveBeenCalled();
        expect(stateStore.setState).toHaveBeenCalled();
    })

    it("Should return object from state", () => {

        let obj = new MockObject();
        obj.id = "randomUid";

        spyOn(stateStore, 'getState').and.returnValue(obj);
        let value = controller.get();

        expect(stateStore.getState).toHaveBeenCalled();
        expect(value.id).toBe(obj.id);
    })

    it("Should return object observable from state", () => {

        let obj = new MockObject();
        obj.id = "randomUid";

        spyOn(stateStore, 'getState$').and.returnValue(of(obj));
        let value = controller.get$();

        value.subscribe(objresult=>{
            expect(objresult.id).toBe(obj.id);
        })
        .unsubscribe();
        
        expect(stateStore.getState$).toHaveBeenCalled();
        expect(value).toBeInstanceOf(Observable);
    })


    it("Should create object and set the state", () => {

        let obj = new MockObject();
        obj.id = "randomUid";

        spyOn(stateStore, 'setState');
        spyOn(api, 'addWithId');
        controller.createWithId(obj.id, obj);
        
        expect(stateStore.setState).toHaveBeenCalled();
        expect(api.addWithId).toHaveBeenCalled();

    })

    
})







