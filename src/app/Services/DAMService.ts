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
import { Message } from '../Models/Message';
import { Log } from '../Models/Log';
import { CartProduct } from '../Models/CartProduct';
import { FilterTag } from '../Models/FilterTag';
import { ProductFilterTag } from '../Models/ProductFilterTag';

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

        this.cartSubject = new BehaviorSubject<CartProduct[]>([]);
        this.cart$ = this.cartSubject.asObservable();

        this.cartCountSubject = new BehaviorSubject<number>(0);
        this.cartCount$ = this.cartCountSubject.asObservable();
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

    public cart: CartProduct[] = [];
    public cartSubject: BehaviorSubject<any>;
    public cart$: Observable<any>;

    public cartCountSubject: BehaviorSubject<any>;
    public cartCount$: Observable<any>;
    public cartCount: number = 0;

    public postMessage(message: Message): Observable<ApiResponse<boolean>> {
        return this.makeRequest("POST", "/postMessage", message);
    }

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
        if (q.length > 0) {
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

    private postLog(ip: string, information: string) {
        let body: Log = {
            id: 0,
            information: information,
            type: 0,
            ipAdress: ip,
            logged: new Date()
        };

        return this.makeRequest("POST", "/PostLog", body);
    }

    public logIp(information: string) {
        return this.getIP().pipe(flatMap(response => {
            return this.postLog(response, information);
        }));
    }

    //Landing
    public addNewProductToCart(cartProduct: CartProduct): Observable<ApiResponse<CartProduct>> {
        this.cartCount++;
        this.cartCountSubject.next(this.cartCount);
        this.cart.push(cartProduct);
        this.cartSubject.next(this.cart);

        return this.makeRequest("GET", "/addNewProductToCart/" + cartProduct.product.id);
    }


    //Shoppingcard
    public addProductToCart(cartProduct: CartProduct): Observable<ApiResponse<CartProduct>> {
        let index = this.cart.findIndex(c => c.product.id == cartProduct.product.id);
        
        if (index > -1) {
            this.cart.splice(index, 1, cartProduct);
        }
        this.cartSubject.next(this.cart);
        return this.makeRequest("GET", "/AddProductToCart/" + cartProduct.id);
    }

    public removeProductFromCart(cartProduct: CartProduct): Observable<ApiResponse<CartProduct>> {
        let index = this.cart.findIndex(c => c.product.id == cartProduct.product.id);
        
        if (index > -1 && cartProduct.quantity >=1) {
            this.cart.splice(index, 1, cartProduct);
        } else {
            this.cart.splice(index, 1);
        }
        this.cartSubject.next(this.cart);
        return this.makeRequest("GET", "/RemoveProductFromCart/" + cartProduct.id);
    }

    public removeAllProductFromCart(cartProduct: CartProduct): Observable<ApiResponse<CartProduct>> {
        this.cartCount--;
        this.cartCountSubject.next(this.cartCount);
        let index = this.cart.findIndex(c => c.product.id == cartProduct.product.id);
        
        if (index > -1) {
            this.cart.splice(index, 1);
        }

        this.cartSubject.next(this.cart);

        return this.makeRequest("GET", "/RemoveAllProductFromCart/" + cartProduct.id);
    }

    public getProductsFromCart(): Observable<ApiResponse<CartProduct[]>> {
        return this.makeRequest("GET", "/GetProductsFromCart");
    }

    public getCartCount(): Observable<ApiResponse<number>> {
        return this.makeRequest("GET", "/GetCartCount");
    }

    //FilterTags
    public addFilterTag(filterTag: FilterTag): Observable<ApiResponse<number>> {
        return this.makeRequest("POST", "/AddFilterTag", filterTag);
    }

    public updateFilterTag(filterTag: FilterTag): Observable<ApiResponse<number>> {
        return this.makeRequest("PUT", "/UpdateFilterTag", filterTag);
    }

    public deleteFilterTag(filterTag: FilterTag): Observable<ApiResponse<number>> {
        return this.makeRequest("POST", "/DeleteFilterTag", filterTag);
    }

    public addProductFilterTag(productFilterTag: ProductFilterTag): Observable<ApiResponse<number>> {
        return this.makeRequest("POST", "/AddProductFilterTag", productFilterTag);
    }

    public deleteProductFilterTag(productFilterTag: ProductFilterTag): Observable<ApiResponse<number>> {
        return this.makeRequest("POST", "/DeleteProductFilterTag", productFilterTag);
    }

    public getFilterTags(): Observable<ApiResponse<FilterTag[]>> {
        return this.makeRequest("GET", "/GetFilterTags");
    }
}