import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { OrdersCommonModule } from '@ngxp/orders-common';
import { ShoppingCartCommonModule } from '@ngxp/shopping-cart-common';
import { UserProfileCommonModule } from '@ngxp/user-profile-common';
import { ShoppingCartItemListComponent } from './shopping-cart-item-list/shopping-cart-item-list.component';
import { ShoppingCartItemComponent } from './shopping-cart-item-list/shopping-cart-item/shopping-cart-item.component';
import { UpdateQuantityFormComponent } from './shopping-cart-item-list/shopping-cart-item/update-quantity-form/update-quantity-form.component';
import { ShoppingCartNavigationEffects } from './shopping-cart-navigation.effects';
import { ShoppingCartViews } from './shopping-cart.views';
import { ShoppingCartIsEmptyPipe } from './shopping-cart/shopping-cart-is-empty.pipe';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ShoppingCartEffects } from './state/shopping-cart.effects';
import { initialState as shoppingCartInitialState, shoppingCartReducer, SHOPPING_CART_FEATURE_KEY } from './state/shopping-cart.reducer';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            { path: '', pathMatch: 'full', component: ShoppingCartComponent, data: { view: ShoppingCartViews.Root } }
        ]),
        StoreModule.forFeature(SHOPPING_CART_FEATURE_KEY, shoppingCartReducer, { initialState: shoppingCartInitialState }),
        EffectsModule.forFeature([
            ShoppingCartEffects,
            ShoppingCartNavigationEffects
        ]),
        ShoppingCartCommonModule,
        OrdersCommonModule,
        UserProfileCommonModule
    ],
    declarations: [
        ShoppingCartComponent,
        ShoppingCartItemListComponent,
        UpdateQuantityFormComponent,
        ShoppingCartItemComponent,
        ShoppingCartIsEmptyPipe
    ]
})
export class ShoppingCartModule { }
