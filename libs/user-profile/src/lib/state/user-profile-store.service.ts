import { Injectable } from '@angular/core';
import { Dispatch, Dispatcher, Select, Selector, StoreService } from '@ngxp/store-service';
import { addAddressAction, addPaymentOptionAction, loadUserProfileAction, removeAddressAction, removePaymentOptionAction, updateAddressAction, updatePaymentOptionAction } from './user-profile.actions';
import { UserProfileAppState } from './user-profile.reducer';
import { selectAddresses, selectPaymentOptions } from './user-profile.selectors';

@Injectable({
    providedIn: 'root'
})
export class UserProfileStore extends StoreService<UserProfileAppState> {

    @Select(selectAddresses)
    getAddresses!: Selector<typeof selectAddresses>;

    @Select(selectPaymentOptions)
    getPaymentOptions!: Selector<typeof selectPaymentOptions>;

    @Dispatch(loadUserProfileAction)
    loadUserProfile!: Dispatcher<typeof loadUserProfileAction>;

    @Dispatch(addAddressAction)
    addAddress!: Dispatcher<typeof addAddressAction>;

    @Dispatch(updateAddressAction)
    updateAddress!: Dispatcher<typeof updateAddressAction>;

    @Dispatch(removeAddressAction)
    removeAddress!: Dispatcher<typeof removeAddressAction>;

    @Dispatch(addPaymentOptionAction)
    addPaymentOption!: Dispatcher<typeof addPaymentOptionAction>;

    @Dispatch(updatePaymentOptionAction)
    updatePaymentOption!: Dispatcher<typeof updatePaymentOptionAction>;

    @Dispatch(removePaymentOptionAction)
    removePaymentOption!: Dispatcher<typeof removePaymentOptionAction>;

}
