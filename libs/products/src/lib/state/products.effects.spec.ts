import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { addId, Resource } from '@luchsamapparat/common';
import { LoadSearchResultsAction, Product, SearchResultsLoadedAction } from '@luchsamapparat/products-common';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { DataPersistence } from '@nrwl/nx';
import { hot } from 'jasmine-marbles';
import { Observable, of as observableOf } from 'rxjs';
import { ProductService } from '../product.service';
import { ProductsEffects } from './products.effects';

describe('ProductsEffects', () => {
    let actions$: Observable<any>;
    let effects$: ProductsEffects;
    let productService: ProductService;

    const product: Resource<Product> = addId({
        description: '',
        image: '',
        name: '',
        price: 0
    }, 'id');
    const searchResults = [product];

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                StoreModule.forRoot({})
            ],
            providers: [
                ProductsEffects,
                ProductService,
                DataPersistence,
                provideMockActions(() => actions$)
            ]
        });

        effects$ = TestBed.get(ProductsEffects);
        productService = TestBed.get(ProductService);
    });

    describe('loadSearchResults', () => {
        it('dispatches a SearchResultsLoadedAction with the search results returned by the service', () => {
            const expectedQuery = 'query';
            spyOn(productService, 'searchProducts').and.returnValue(observableOf(searchResults));

            actions$ = hot('-a-|', { a: new LoadSearchResultsAction(expectedQuery) });

            expect(effects$.loadSearchResults$).toBeObservable(
                hot('-a-|', { a: new SearchResultsLoadedAction(searchResults) })
            );
        });
    });
});
