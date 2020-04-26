import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { User } from '../Models/User';
import { Credentials } from '../Models/Credentials';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    private url = environment.apiUrl + 'api/auth/';

    // http options used for making API calls
    private httpOptions: any;
    public httpImageOptions: any;
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient, private router: Router) {
        let user = JSON.parse(localStorage.getItem('currentUser')) as User;
        this.currentUserSubject = new BehaviorSubject<User>(user);
        this.currentUser = this.currentUserSubject.asObservable();
        

        if (user == null) {
            this.httpOptions = {
                headers: new HttpHeaders(
                    {
                        'Content-Type': 'application/json'
                    })
            };
            this.loginWithToken("mikevol@live.nl", "testing").subscribe(u => this.router.navigate(['/cvBoard']));
        } else if (user != null) {
            this.httpOptions = {
                headers: new HttpHeaders(
                    {
                        'Content-Type': 'application/json',
                        'Authorization': 'Authorization ' + JSON.stringify(user.token)
                    })
            };

            this.httpImageOptions = {
                headers: new HttpHeaders(
                    {
                        'Authorization': 'Authorization ' + JSON.stringify(user.token)
                    })
            };
        }
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {

        return this.http.post<any>(`${this.url}login/`, { username, password })
            .pipe(map(data => {
                let user = data;
                //login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }
                return user;
            }));
    }

    public register(nickname: string, email: string, username: string, password: string) {
        return this.http.post(`${this.url}register/`, JSON.stringify({ nickname, email, username, password }), this.httpOptions)
            .pipe(map((user: any) => {
                return this.validateUser(user);
            },
                err => {
                    console.error('login error', err);
                    //this.errors = err['error'];
                }
            ));
    }

    public loginWithToken(username: string, password: string) {
        return this.http.post(`${this.url}login/`, JSON.stringify(new Credentials(username, password)), this.httpOptions)
            .pipe(map((token: any) => {
                let user = new User();
                user.token = token;
                return this.validateUser(user);
            },
                err => {
                    console.error('Login error: ', err);
                    //this.errors = err['error'];
                }
            ));
    }

    private validateUser(user: any) {
        if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
        }
        this.httpOptions = {
            headers: new HttpHeaders(
                {
                    'Content-Type': 'application/json',
                    'Authorization': 'Authorization ' + JSON.stringify(user.token)
                })
        };
        return user;
    }

    public getHttpHeaderWithToken(): any {
        if (!this.httpOptions) {
            console.log("woops empty");
        }
        return this.httpOptions;
    }

    public setHttpHeader(httpOptions: any) {
        this.httpOptions = httpOptions;
    }

    public logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.httpOptions = {
            headers: new HttpHeaders(
                {
                    'Content-Type': 'application/json'
                })
        };
    }

}