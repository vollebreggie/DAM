import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FooterService {

    public footerSubject: BehaviorSubject<boolean>;
    public showFooter: Observable<boolean>;

    constructor() {
        this.footerSubject = new BehaviorSubject<boolean>(true);
        this.showFooter = this.footerSubject.asObservable();
    }
}