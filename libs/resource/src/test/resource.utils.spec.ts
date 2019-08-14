import { Resource } from '@ngxp/resource';
import { SomeType } from '@ngxp/resource/test';
import { addId } from './resource.utils';

describe('resourceUtils', () => {
    const object: SomeType = {
        value: 'some value'
    };

    const resource: Resource<SomeType> = {
        _id: 'id',
        ...object
    };

    describe('addId', () => {
        it('returns the given object as resource with the given ID', () => {
            expect(addId(object, resource._id)).toEqual(resource);
        });
    });
});
