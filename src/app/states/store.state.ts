import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class StateStore{
 store: {[key: string]: BehaviorSubject<any>}  = {};


 getState$(name: string): Observable<any> | null{
    let stateInstance = this.store[name];

    if(stateInstance){
        return stateInstance.asObservable();
    }

    this.store[name] = new BehaviorSubject(null);
    return this.store[name].asObservable();
 }

 getState(name: string): any{
    let stateInstance = this.store[name];

    if(stateInstance){
        return stateInstance.getValue();
    }

    this.store[name] = new BehaviorSubject(null);
    return this.store[name].getValue();
 }

 setState(name: string, stateObject: any): void{
    let stateInstance = this.store[name];

    if(stateInstance){
        stateInstance.next(stateObject);
    }else{
        this.store[name] = new BehaviorSubject(stateObject);
    }
 }
}