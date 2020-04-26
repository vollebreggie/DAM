import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NavigationService {

    public navigationSubject: BehaviorSubject<boolean>;
    public showNavigation: Observable<boolean>;

    constructor() {
        this.navigationSubject = new BehaviorSubject<boolean>(true);
        this.showNavigation = this.navigationSubject.asObservable();
    }
}