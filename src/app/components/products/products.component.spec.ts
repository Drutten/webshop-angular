import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductService } from 'src/app/services/product.service';
import { ProductServiceMock } from 'src/app/services/product.service.mock';

import { ProductsComponent } from './products.component';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsComponent ],
      providers: [{provide: ProductService, useClass: ProductServiceMock}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get 3 products when loading', () => {
    expect(component.products.length).toBe(3);
  });
});
