import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import { ProductService } from './product.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { API_PRODUCTS_ENDPOINT } from '../shared/constants';
import { IProduct } from '../interfaces/i-product';

describe('ProductService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductService],
      imports: [HttpClientTestingModule]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ProductService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should fetch products', () => {
    const products = [
      {id: 1, name: 'Kitty', description: 'Test movie 1', imageUrl: 'url1', price: 100, year: '2000', productCategory:[]},
      {id: 2, name: 'Molly', description: 'Test movie 2', imageUrl: 'url2', price: 100, year: '2000', productCategory:[]}
    ];

    httpClient.get<IProduct[]>(API_PRODUCTS_ENDPOINT)
    .subscribe(items => {
      expect(items.length).toBe(2);
    });

    const req = httpTestingController.expectOne(API_PRODUCTS_ENDPOINT);
    expect(req.request.method).toBe("GET");
    req.flush(products);
  });


  it('should exclude items with 0 as price when fetching products', () => {
    const products = [
      {id: 1, name: 'Kitty', description: 'Test movie 1', imageUrl: 'url1', price: 100, year: '2000', productCategory:[]},
      {id: 2, name: 'Molly', description: 'Test movie 2', imageUrl: 'url2', price: 100, year: '2000', productCategory:[]},
      {id: 3, name: 'Zero', description: 'Zero', imageUrl: 'url0', price: 0, year: '2000', productCategory:[]}
    ];

    service.fetchProducts();
    service.products$.subscribe(items => {
      expect(items.length).toBe(2);
    });

    const req = httpTestingController.expectOne(API_PRODUCTS_ENDPOINT);
    expect(req.request.method).toBe("GET");
    req.flush(products);
  });


  it('should get a single product with #product$', () => {
    const product = {id: 2, name: 'Molly', description: 'Test movie 2', imageUrl: 'url2', price: 100, year: '2000', productCategory:[]};

    service.fetchProduct(2);
    service.product$.subscribe(item => {
      expect(item.name).toEqual('Molly');
    });

    const req = httpTestingController.expectOne(`${API_PRODUCTS_ENDPOINT}/2`);
    expect(req.request.method).toBe("GET");
    req.flush(product);
  });


  it('should get error 404', () => {
    const errorMessage = '404 - Not found';

    httpClient.get<IProduct[]>(API_PRODUCTS_ENDPOINT)
    .subscribe(
      items => fail('should fail'),
      (error: HttpErrorResponse) => {
      expect(error.status).toEqual(404, 'status');
      expect(error.error).toEqual(errorMessage, 'message');
    });

    const req = httpTestingController.expectOne(API_PRODUCTS_ENDPOINT);
    expect(req.request.method).toBe("GET");
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });



  it('should get 404 error message with #errorText$', () => {
    const errorMessage = '404 - Not found';

    service.fetchProducts();
    service.errorText$.subscribe(message => {
      expect(message).toEqual('Varan kunde inte hittas');
    });

    const req = httpTestingController.expectOne(API_PRODUCTS_ENDPOINT);
    expect(req.request.method).toBe("GET");
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });


});
