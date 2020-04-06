import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Product } from '../product.model';

@Component({
    selector: 'ngxp-product-price',
    templateUrl: './product-price.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductPriceComponent {

    @Input()
    product!: Product | null;

}
