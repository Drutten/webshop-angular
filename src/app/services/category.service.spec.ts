import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import { CategoryService } from './category.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { API_CATEGORIES_ENDPOINT } from '../shared/constants';
import { ICategory } from '../interfaces/i-category';

describe('CategoryService', () => {

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: CategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoryService],
      imports: [HttpClientTestingModule]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CategoryService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });



  it('should fetch categories', () => {
    const categories = [
      {id: 1, name: 'Action'},
      {id: 2, name: 'Comedy'}
    ];

    httpClient.get<ICategory[]>(API_CATEGORIES_ENDPOINT)
    .subscribe(items => {
      expect(items.length).toBe(2);
    })

    const req = httpTestingController.expectOne(API_CATEGORIES_ENDPOINT);
    expect(req.request.method).toBe("GET");
    req.flush(categories);
  });



  it('should get categories with observable', () => {
    const categories = [
      {id: 1, name: 'Action'},
      {id: 2, name: 'Comedy'}
    ];

    service.getCategories();
    service.categories$.subscribe(items => {
      expect(items.length).toBe(2);
    });

    const req = httpTestingController.expectOne(API_CATEGORIES_ENDPOINT);
    expect(req.request.method).toBe("GET");
    req.flush(categories);
  });


  
  it('should get 404 error', () => {
    const errorMessage = '404 - Not found';

    httpClient.get<ICategory[]>(API_CATEGORIES_ENDPOINT)
    .subscribe(
      items => fail('should fail'),
      (error: HttpErrorResponse) => {
      expect(error.status).toEqual(404, 'status');
      expect(error.error).toEqual(errorMessage, 'message');
    });

    const req = httpTestingController.expectOne(API_CATEGORIES_ENDPOINT);
    expect(req.request.method).toBe("GET");
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });

});
