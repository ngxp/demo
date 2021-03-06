import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { expectElementFromFixture } from '@ngxp/common/test';
import { searchResults } from '@ngxp/products/test';
import { provideStoreServiceMock } from '@ngxp/store-service/testing';
import { ProductsStore } from '../../state';
import { SearchResultsComponent } from './search-results.component';

describe('SearchResultsComponent', () => {
    let component: SearchResultsComponent;
    let fixture: ComponentFixture<SearchResultsComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                SearchResultsComponent
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ],
            providers: [
                provideStoreServiceMock(ProductsStore, {
                    getSearchResults: searchResults
                })
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchResultsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('renders the search results as ngxp-product-list', () => {
        const productList = fixture.debugElement.query(By.css('ngxp-product-list')).nativeElement

        expectElementFromFixture(fixture, 'ngxp-product-list').not.toBeNull();
        expect(productList.products).toEqual(searchResults.products);
    });
});
