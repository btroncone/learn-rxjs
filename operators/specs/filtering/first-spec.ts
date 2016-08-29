declare var describe, it, expect, hot, cold, expectObservable, expectSubscriptions, rxTestScheduler, beforeEach;
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';

describe('The first operator examples', () => {
    
    describe('Example 1 - First value from sequence', () => {
        it('should emit the first value then complete', () => {
            const source = Observable.from([1,2,3,4,5]);
            const example = source.first();
            const expected = '(a|)';

            expectObservable(example).toBe(expected, {a: 1});
        });
    });

    describe('Example 2 - First value to pass predicate', () => {
        it('should emit the first value to pass predicate then complete', () => {
            const values = {a: 1, b: 2, c: 3, d: 4, e: 5};
            const source = cold('(abcde|)', values);
            const example = source.first(num => num === 5);
            const expected = '(e|)';

            expectObservable(example).toBe(expected, values)
        });
    });

    describe('Example 3 - Using optional projection function', () => {
        it('should emit the result of the projection function, given the first value', () => {
            const values = {a: 1, b: 2, c: 3, d: 4, e: 5, f: 'First even: 2 is at index: 1'};
            const source = cold('(abcde|)', values);
            const example = source.first(num => num % 2 === 0, 
                                    (result, index) => `First even: ${result} is at index: ${index}`);
            const expected = '(f|)';

            expectObservable(example).toBe(expected, values)
        });
    });  

    describe('Example 4 - Utilizing default value', () => {
        it('should emit the default value when source completes and no values pass predicate', () => {
            const values = {a: 1, b: 2, c: 3, d: 4, e: 5, f: 'Nothing'};
            const source = cold('(abcde|)', values);
            const example = source.first(val => val > 5, val => `Value: ${val}`, 'Nothing');
            const expected = '(f|)';

            expectObservable(example).toBe(expected, values)
        });
    });         
});