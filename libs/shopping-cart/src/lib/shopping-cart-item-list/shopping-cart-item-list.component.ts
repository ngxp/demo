import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ResourceWith } from '@ngxp/resource';
import { QuantityUpdate, ShoppingCart, ShoppingCartItem } from '../shopping-cart.model';

@Component({
    selector: 'ngxp-shopping-cart-item-list',
    templateUrl: './shopping-cart-item-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShoppingCartItemListComponent {

    @Input()
    shoppingCart!: ShoppingCart;

    @Output()
    updateQuantity = new EventEmitter<ResourceWith<QuantityUpdate>>();

    @Output()
    delete = new EventEmitter<ShoppingCartItem>();

    onUpdateQuantity(quantityUpdate: ResourceWith<QuantityUpdate>) {
        this.updateQuantity.emit(quantityUpdate);
    }

    onDelete(shoppingCartItem: ShoppingCartItem) {
        this.delete.emit(shoppingCartItem);
    }

}
