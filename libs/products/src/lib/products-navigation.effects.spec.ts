// tslint:disable: no-non-null-assertion

import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { RouterNavigationAction, ROUTER_NAVIGATION } from '@ngrx/router-store';
import { cold, hot } from 'jest-marbles';
import { Observable } from 'rxjs';
import { ProductsNavigationEffects } from './products-navigation.effects';
import { loadSearchResultsAction } from './state/products.actions';

describe('ProductsNavigationEffects', () => {
    let actions$: Observable<any>;
    let effects$: ProductsNavigationEffects;

    const query = 'query';

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ProductsNavigationEffects,
                provideMockActions(() => actions$)
            ]
        });

        effects$ = TestBed.get(ProductsNavigationEffects);
    });

    describe('loadSearchResultsOnNavigate', () => {
        let routerNavigationAction: RouterNavigationAction;

        beforeEach(() => {
            routerNavigationAction = {
                type: ROUTER_NAVIGATION,
                payload: {
                    event: null!,
                    routerState: {
                        url: '/products',
                        root: <any> {
                            queryParams: { query },

                        }
                    }
                }
            };
        })

        it('dispatches a LoadSearchResultsAction with the query from the query params when the user navigates to /products', () => {
            actions$ = hot('-a-|', { a: routerNavigationAction });

            expect(effects$.loadSearchResultsOnNavigate$).toBeObservable(
                hot('-a-|', { a: loadSearchResultsAction({ query }) })
            );
        });

        it('dispatches a LoadSearchResultsAction with NULL as query when the route contains no query param', () => {
            routerNavigationAction.payload.routerState.root.queryParams = {};

            actions$ = hot('-a-|', { a: routerNavigationAction });

            expect(effects$.loadSearchResultsOnNavigate$).toBeObservable(
                hot('-a-|', { a: loadSearchResultsAction({ query: null }) })
            );
        });

        it('dispatches no action when the target route does not start with /products', () => {
            routerNavigationAction.payload.routerState.url = '/shopping-cart';

            actions$ = hot('-a-|', { a: routerNavigationAction });

            expect(effects$.loadSearchResultsOnNavigate$).toBeObservable(
                cold('---|')
            );
        });
    });
});
