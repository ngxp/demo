import { ChangeDetectionStrategy, Component, EventEmitter, Input, NgModule, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OnNonNullChange } from '@ngxp/common';
import { Resource, ResourceWith } from '@ngxp/resource';
import { QuantityUpdate, ShoppingCartItem } from '../../../../domain';

@Component({
    selector: 'ngxp-update-quantity-form',
    templateUrl: './update-quantity-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateQuantityFormComponent {

    @Input()
    @OnNonNullChange()
    shoppingCartItem!: Resource<ShoppingCartItem>;

    @Output()
    updateQuantity = new EventEmitter<ResourceWith<QuantityUpdate, ShoppingCartItem>>();

    quantity = new FormControl();

    onSubmit(event: Event) {
        event.preventDefault();
        this.updateQuantity.emit({
            resource: this.shoppingCartItem,
            with: { quantity: this.quantity.value }
        });
    }

    private onChangeShoppingCartItem(shoppingCartItem: ShoppingCartItem) {
        this.quantity.setValue(shoppingCartItem.quantity);
    }

}

@NgModule({
    declarations: [UpdateQuantityFormComponent],
    exports: [UpdateQuantityFormComponent],
    imports: [FormsModule, ReactiveFormsModule]
})
export class UpdateQuantityFormModule { }
