
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { RouterNavigationAction, ROUTER_NAVIGATION } from '@ngrx/router-store';
import { LoadSearchResultsAction } from '@ngxp/products-common';
import { defaultTo } from 'lodash-es';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class ProductsNavigationEffects {

    @Effect()
    loadSearchResultsOnNavigate$ = this.actions$.pipe(
        ofType(ROUTER_NAVIGATION),
        map((action: RouterNavigationAction) => action.payload),
        map(routerNavigationPayload => routerNavigationPayload.routerState),
        filter(routerState => routerState.url.startsWith('/products')),
        map(routerState => routerState.root.queryParams.query),
        map(query => defaultTo(query, null)),
        map(query => new LoadSearchResultsAction(query))
    );

    constructor(
        private actions$: Actions
    ) {}
}
