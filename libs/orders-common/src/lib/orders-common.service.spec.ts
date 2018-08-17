import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { getId } from '@ngxp/common';
import { toNewOrderRequest } from './new-order-request.mapper';
import { NewOrder, Order, OrderStatus } from './order.model';
import { OrdersCommonService } from './orders-common.service';
import { newOrder, order } from '@ngxp/orders-common/test';

describe('OrdersCommonService', () => {
    let ordersCommonService: OrdersCommonService;
    let httpController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [OrdersCommonService]
        });

        ordersCommonService = TestBed.get(OrdersCommonService);
        httpController = TestBed.get(HttpTestingController);
    });

    describe('placeOrder', () => {
        it('submits the given addition to the shopping cart to the backend', () => {
            ordersCommonService
                .placeOrder(newOrder)
                .subscribe(createdOrder => {
                    expect(createdOrder).toBe(order);
                });

            const postRequest = httpController.expectOne(`http://example.hypercontract.org/orders`);

            expect(postRequest.request.method).toEqual('POST');
            expect(postRequest.request.body).toEqual(toNewOrderRequest(newOrder));

            postRequest.flush(null, {
                status: 201,
                statusText: 'Created',
                headers: {
                    Location: `http://example.hypercontract.org/orders/${getId(order)}`
                }
            });

            const getRequest = httpController.expectOne(`http://example.hypercontract.org/orders/${getId(order)}`);

            expect(getRequest.request.method).toEqual('GET');

            getRequest.flush(order);

            httpController.verify();
        });
    });

});
