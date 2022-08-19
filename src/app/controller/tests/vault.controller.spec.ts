import { TestBed } from "@angular/core/testing";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireDatabaseModule } from "@angular/fire/compat/database";
import { VaultApi } from "src/app/api/vault.api";
import { Vault } from "src/app/models/vault.interface";
import { StateStore } from "src/app/states/store.state";
import { environment } from "src/environments/environment";
import { VaultController } from "../vault.controller";

describe('VaultController', () => {
    let controller: VaultController;
    let stateStore: StateStore;
    let api: VaultApi;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AngularFireModule.initializeApp(environment.firebaseConfig),
                AngularFireDatabaseModule
            ],
            providers: [VaultController]
        });

        stateStore = TestBed.inject(StateStore);
        api = TestBed.inject(VaultApi);
        controller = TestBed.inject(VaultController);
    })

    it("Should return vault with matching id field", ()=>{
        let vault1 = new Vault();
        vault1.id = 'vault1';
        let vault2 = new Vault();
        vault2.id = 'vault2';

        let vaults = [vault1, vault2]
        spyOn(controller, "getAll").and.returnValues(vaults);

        
        let result = controller.findVault(vault1.id);
        expect(result).toBeDefined();
        expect(result?.id == vault1.id).toBeTrue();
    })

})