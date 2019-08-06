import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { expectElementFromFixture } from '@ngxp/common/test';
import { ProductsCommonStore } from '@ngxp/products-common';
import { provideStoreServiceMock } from '@ngxp/store-service/testing';
import { HomepageComponent } from './homepage.component';

describe('HomepageComponent', () => {
    let component: HomepageComponent;
    let fixture: ComponentFixture<HomepageComponent>;
    let productsCommonStore: ProductsCommonStore;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            declarations: [
                HomepageComponent
            ],
            providers: [
                provideStoreServiceMock(ProductsCommonStore),
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ]
        })
            .compileComponents();

        productsCommonStore = TestBed.get(ProductsCommonStore);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomepageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('renders a product search form', () => {
        expectElementFromFixture(fixture, 'ngxp-product-search-form').not.toBeNull();
    });

    it('triggers a search for products with the provided query when the product search form emits a search event', () => {
        const expectedQuery = 'query';
        const searchProductsSpy = spyOn(productsCommonStore, 'searchProducts');
        const productSearchForm = fixture.debugElement.query(By.css('ngxp-product-search-form'));

        productSearchForm.triggerEventHandler('search', expectedQuery);

        expect(searchProductsSpy).toHaveBeenCalledWith({ query: expectedQuery });
    });
});
