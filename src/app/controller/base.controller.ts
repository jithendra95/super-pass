import { Observable, Subscription } from "rxjs";
import { BaseApi } from "../api/base.api";
import { StateStore } from "../states/store.state";

export class BaseController<Type>{
    protected store: StateStore;
    protected api: BaseApi<Type>;
    protected entity: string;
    private subs: Subscription[] = [];

    constructor(store: StateStore, api: BaseApi<Type>, entity: string) {
        this.store = store;
        this.api = api;
        this.entity = entity;
    }

    public load(id: string | number): void {
        this.subs.push(
            this.api.read(id).subscribe((value) => {
                this.store.setState(this.entity, value);
            })
        );
    }

    public get$(): Observable<Type> {
        return this.store.getState$(this.entity) as Observable<Type>;
    }

    public get(): Type {
        return this.store.getState(this.entity) as Type;
    }

    public createWithId(id: string, value: Type): void{
        this.api.addWithId(id, value);
        this.store.setState(this.entity, value);
    }

    private unload(): void {
        this.subs.forEach((sub) => {
            sub.unsubscribe();
        });
    }
}