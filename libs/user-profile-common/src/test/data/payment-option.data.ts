import { Blueprint, createBlueprintBuilder } from '@ngxp/builder';
import * as faker from 'faker';
import { PaymentOption } from '@ngxp/user-profile-common';
import { Resource } from '@ngxp/common';
import { createResourceBlueprintBuilder } from '@ngxp/common/test';

const paymentOptionBlueprint: Blueprint<PaymentOption> = {
    accountOwner: () => faker.name.findName(),
    iban: () => faker.finance.iban(),
    bic: () => faker.finance.bic()
};
export const paymentOptionBuilder = createResourceBlueprintBuilder(paymentOptionBlueprint);

export const paymentOption: Resource<PaymentOption> = paymentOptionBuilder().freeze().build();
export const paymentOptions: Resource<PaymentOption>[] = paymentOptionBuilder().freeze().buildMany(5);
