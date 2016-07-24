declare var describe, it, expect, hot, cold, expectObservable, expectSubscriptions, rxTestScheduler, beforeEach;
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/concat';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/delay';

describe('The concat operator examples', () => {
    describe('Example 1 - concat 2 basic observables', () => {
        it('should emit values from sourceTwo after sourceOne', () => {
            const sourceOne = Observable.of(1,2,3);
            const sourceTwo = Observable.of(4,5,6);
            const example = sourceOne.concat(sourceTwo);
            const values = {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6};
            const expected = '(abcdef|)';

            expectObservable(example).toBe(expected, values);
        });
    });  

    describe('Example 2 - concat as static method', () => {
        it('should emit values from sourceTwo after sourceOne when used as static method', () => {
            const sourceOne = Observable.of(1,2,3);
            const sourceTwo = Observable.of(4,5,6);
            const example = Observable.concat(sourceOne,sourceTwo);
            const values = {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6};
            const expected = '(abcdef|)';

            expectObservable(example).toBe(expected, values);
        });
    });    

    describe('Example 3 - concat with a delayed source', () => {
        it('should emit values from sourceTwo after delayed sourceThree completes', () => {
            const sourceOne = Observable.of(1,2,3);
            const sourceTwo = Observable.of(4,5,6);
            const sourceThree = sourceOne.delay(20, rxTestScheduler);
            const example = sourceThree.concat(sourceTwo);
            const values = {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6};
            const expected = '--(abcdef|)';

            expectObservable(example).toBe(expected, values);
        });
    }); 
});