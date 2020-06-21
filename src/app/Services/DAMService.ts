import { RestService } from './RestService';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './AuthenticationService';
import { User } from '../Models/User';
import { ApiResponse } from '../Models/Responses/ApiReponse';
import { Landing } from '../Models/Landing';
import { Blog } from '../Models/Blog';
import { Reference } from '../Models/Reference';
import { Material } from '../Models/Material';
import { Product } from '../Models/Product';
import { Category } from '../Models/Category';
import { debounceTime, distinctUntilChanged, switchMap, map, flatMap, mergeMap } from 'rxjs/operators';
import { stringify } from 'querystring';

@Injectable({ providedIn: 'root' })
export class DAMService extends RestService<User> {
    constructor(http: HttpClient, _authenticationService: AuthenticationService) {
        super('DAM', http, _authenticationService);
        this.currentSubject = new BehaviorSubject<User>(null);
        this.current = this.currentSubject.asObservable();

        this.productsSubject = new BehaviorSubject<Product[]>([]);
        this.products = this.productsSubject.asObservable();

        this.materialsSubject = new BehaviorSubject<Material[]>([]);
        this.materials = this.materialsSubject.asObservable();

        this.referencesSubject = new BehaviorSubject<Reference[]>([]);
        this.references = this.referencesSubject.asObservable();

        this.blogsSubject = new BehaviorSubject<Blog[]>([]);
        this.blogs = this.blogsSubject.asObservable();
    }

    public currentSubject: BehaviorSubject<any>;
    public current: Observable<any>;

    public productsSubject: BehaviorSubject<any>;
    public products: Observable<any>;

    public materialsSubject: BehaviorSubject<any>;
    public materials: Observable<any>;

    public blogsSubject: BehaviorSubject<any>;
    public blogs: Observable<any>;

    public referencesSubject: BehaviorSubject<any>;
    public references: Observable<any>;

    //getAll
    public getAll(): Observable<ApiResponse<any[]>> {
        return this.makeRequest("GET", "/getAll");
    }

    public uploadImage(formData: FormData, type: string): Observable<ApiResponse<string>> {
        return this.makeImageRequest("Post", "/saveImage?type=" + type, formData);
    }

    //product
    public getProduct(id: number): Observable<ApiResponse<Product>> {
        return this.makeRequest("GET", "/getProduct/" + id);
    }

    //product

    public search(terms: Observable<string>) {
        return terms.pipe(debounceTime(100),
            distinctUntilChanged(),
            switchMap(term => this.getProductSearch(term)));
    }

    public getProductSearch(q: string): Observable<Product[]> {
        if(q.length > 0) {
            return this.makeRequest("GET", "/getProductSearch/" + q).pipe(map(r => r.data as Product[]))
        } else {
            return this.makeRequest("GET", "/getProducts").pipe(map(r => r.data as Product[]));
        }
    }

    public getProducts(): Observable<ApiResponse<Product[]>> {
        return this.makeRequest("GET", "/getProducts");
    }

    public createProduct(product: Product): Observable<ApiResponse<Product>> {
        return this.makeRequest("POST", "/createProduct", product);
    }

    public deleteProduct(productId: number): Observable<ApiResponse<Product>> {
        return this.makeRequest("GET", "/deleteProduct/" + productId);
    }

    public updateProduct(product: Product): Observable<ApiResponse<Product>> {
        return this.makeRequest("POST", "/updateProduct", product);
    }


    //materials
    public getMaterials(): Observable<ApiResponse<Material[]>> {
        return this.makeRequest("GET", "/getMaterials");
    }

    public createMaterial(material: Material): Observable<ApiResponse<Material>> {
        return this.makeRequest("POST", "/createMaterial");
    }

    public deleteMaterial(materialId: number): Observable<ApiResponse<Material>> {
        return this.makeRequest("GET", "/deleteMaterial/" + materialId);
    }

    public updateMaterial(material: Material): Observable<ApiResponse<Material>> {
        return this.makeRequest("POST", "/updateMaterial", material);
    }


    //Reference
    public getReferences(): Observable<ApiResponse<Reference[]>> {
        return this.makeRequest("GET", "/getReferences");
    }

    public createReference(reference: Reference): Observable<ApiResponse<Reference>> {
        return this.makeRequest("POST", "/createReference", reference);
    }

    public deleteReference(referenceId: number): Observable<ApiResponse<Reference>> {
        return this.makeRequest("GET", "/deleteReference/" + referenceId);
    }

    public updateReference(reference: Reference): Observable<ApiResponse<Reference>> {
        return this.makeRequest("POST", "/updateReference", reference);
    }

    public getStoneMaterials(): Observable<ApiResponse<Material[]>> {
        return this.makeRequest("GET", "/getStoneMaterials");
    }

    public getWoodMaterials(): Observable<ApiResponse<Material[]>> {
        return this.makeRequest("GET", "/getWoodMaterials");
    }

    //Blog
    public getBlogs(): Observable<ApiResponse<Blog[]>> {
        return this.makeRequest("GET", "/getBlogs");
    }

    public getBlog(blogId: number): Observable<ApiResponse<Blog>> {
        return this.makeRequest("GET", "/getBlog/" + blogId);
    }

    public createBlog(blog: Blog): Observable<ApiResponse<Blog>> {
        return this.makeRequest("POST", "/createBlog", blog);
    }

    public updateBlog(blog: Blog): Observable<ApiResponse<Blog>> {
        return this.makeRequest("POST", "/updateBlog", blog);
    }

    public deleteBlog(blogId: number): Observable<ApiResponse<Blog>> {
        return this.makeRequest("GET", "/deleteBlog/" + blogId);
    }

    public getCategories(): Observable<ApiResponse<Category[]>> {
        return this.makeRequest("GET", "/getCategories");
    }

    //Landing
    public getLanding(): Observable<ApiResponse<Landing>> {
        return this.makeRequest("GET", "/getLanding");
    }

    public updateLanding(landing: Landing): Observable<ApiResponse<Landing>> {
        return this.makeRequest("POST", "/updateLanding", landing);
    }

    public updateLandingProductPlaces(products: Product[]): Observable<ApiResponse<Product[]>> {
        return this.makeRequest("POST", "/updateLandingPlaces", products);
    }


}