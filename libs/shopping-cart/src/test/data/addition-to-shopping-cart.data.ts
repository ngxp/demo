import { Blueprint } from '@ngxp/builder';
import { Resource } from '@ngxp/resource';
import { createResourceBlueprintBuilder, resourceUri } from '@ngxp/resource/test';
import { random } from 'lodash-es';
import { AdditionToShoppingCart } from '../../lib/domain/shopping-cart';

const minItemQty = 1;
const maxItemQty = 5;

const additionToShoppingCartBlueprintFactory: Blueprint<AdditionToShoppingCart> = {
    product: () => resourceUri,
    quantity: () => random(minItemQty, maxItemQty)
};
export const additionToShoppingCartBuilder = createResourceBlueprintBuilder(additionToShoppingCartBlueprintFactory);

export const additionToShoppingCart: Resource<AdditionToShoppingCart> = additionToShoppingCartBuilder().freeze().build();
