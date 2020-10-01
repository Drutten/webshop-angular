import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderService } from 'src/app/services/order.service';
import { OrderServiceMock } from 'src/app/services/order.service.mock';
import { OrderItemComponent } from './order-item.component';

describe('OrderItemComponent', () => {

  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderItemComponent, TestHostComponent ],
      providers: [{provide: OrderService, useClass: OrderServiceMock}]
    })
    .compileComponents();
  });


  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
    testHostFixture.detectChanges();
  });


  it('should have an id of 2', () => {
    testHostFixture.detectChanges();
    expect(testHostComponent.orderItemComponent.order.id).toBe(2);
  })


  it('should have Anna as createdBy', () => {
    testHostFixture.detectChanges();
    expect(testHostComponent.orderItemComponent.order.createdBy).toEqual('Anna');
  });


  it('should display 2', () => {
    testHostFixture.detectChanges();
    expect(testHostFixture.nativeElement.querySelector('a').innerText).toContain('2');
  });




  @Component({
    selector: `host-component`,
    template: `<app-order-item [order]="order"></app-order-item>`
  })
  class TestHostComponent {
    order = {
      id: 2,
      companyId: 1,
      created: '2020-01-01T17:00:00Z',
      createdBy: 'Anna',
      paymentMethod: 'Visa',
      totalPrice: 200,
      status: 2,
      orderRows: []
    }
    @ViewChild(OrderItemComponent) public orderItemComponent: OrderItemComponent;
  }

});
