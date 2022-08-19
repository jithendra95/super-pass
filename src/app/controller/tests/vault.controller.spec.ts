import { TestBed } from "@angular/core/testing";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireDatabaseModule } from "@angular/fire/compat/database";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { VaultApi } from "src/app/api/vault.api";
import { Vault } from "src/app/models/vault.interface";
import { StateStore } from "src/app/states/store.state";
import { environment } from "src/environments/environment";
import { UserController } from "../user.controller";
import { VaultController } from "../vault.controller";

describe('VaultController', () => {
    let controller: VaultController;
    let userController: UserController;
    let stateStore: StateStore;
    let api: VaultApi;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AngularFireModule.initializeApp(environment.firebaseConfig),
                AngularFireDatabaseModule,
                MatDialogModule
            ],
            providers: [VaultController]
        });

        stateStore = TestBed.inject(StateStore);
        api = TestBed.inject(VaultApi);
        controller = TestBed.inject(VaultController);
        userController = TestBed.inject(UserController);
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
        expect(result?.id).toBe(vault1.id);
    })

    it("Should create vault and add uid to new Vault object", ()=>{
        let vault1 = new Vault();
        let uid = 'someUID';

        spyOn(api, "add");
        spyOnProperty(userController, "uid").and.returnValue(uid);

        
        controller.saveVault(vault1);

        expect(api.add).toHaveBeenCalled();
        expect(vault1.uid).toBe(uid);

    })

    it("Should update vault for already created Vault object", ()=>{
        let vault1 = new Vault();
        vault1.id = 'someID';

        spyOn(api, "update");
        spyOn(api, "add");

        
        controller.saveVault(vault1);

        expect(api.update).toHaveBeenCalled();
        expect(api.add).not.toHaveBeenCalled();

    })

})