import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import { OrderService } from './order.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IOrder } from '../interfaces/i-order';
import { API_ORDERS_ENDPOINT } from '../shared/constants';

describe('OrderService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: OrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderService],
      imports: [HttpClientTestingModule]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(OrderService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should fetch orders', () => {
    const orders: IOrder[] = [
      {
        id: 1,
        companyId: 10,
        created: '2020-01-01',
        createdBy: 'Anna',
        paymentMethod: 'Visa',
        totalPrice: 100,
        status: 2,
        orderRows: [{id: 1, productId: 1, product: null, amount: 1, orderId: 1}]
      }
    ];

    httpClient.get<IOrder[]>(API_ORDERS_ENDPOINT)
    .subscribe(items => {
      expect(items.length).toBe(1);
    });

    const req = httpTestingController.expectOne(API_ORDERS_ENDPOINT);
    expect(req.request.method).toBe("GET");
    req.flush(orders);
  });


  it('should get error 404', () => {
    const errorMessage = '404 - Not found';

    httpClient.get<IOrder[]>(API_ORDERS_ENDPOINT)
    .subscribe(
      items => fail('should fail'),
      (error: HttpErrorResponse) => {
      expect(error.status).toEqual(404, 'status');
      expect(error.error).toEqual(errorMessage, 'message');
    });

    const req = httpTestingController.expectOne(API_ORDERS_ENDPOINT);
    expect(req.request.method).toBe("GET");
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });


  it('should post an order and be successful', () => {
    const order: IOrder = {
      companyId: 10,
      created: '2020-01-01',
      createdBy: 'Anna',
      paymentMethod: 'Visa',
      totalPrice: 100,
      status: 2,
      orderRows: [{productId: 1, product: null, amount: 1}]
    };

    service.postOrder(order);
    service.isSuccessful$.subscribe(successful => {
      expect(successful).toBe(true);
    });

    const req = httpTestingController.expectOne(API_ORDERS_ENDPOINT);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(order);
    req.flush(order);
  });
});
