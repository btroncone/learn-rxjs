declare var describe, it, expect, hot, cold, expectObservable, expectSubscriptions, rxTestScheduler, beforeEach;
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/take';

describe('The startWith operator examples', () => {
    describe('Example 1 - startWith on number sequence', () => {
        it('should start the sequence with 0', () => {
            const source = Observable.of(1,2,3);
            const example =  source.startWith(0);
            const values = {a: 0, b: 1, c: 2, d: 3};
            const expected = '(abcd|)';

            expectObservable(example).toBe(expected, values);
        });
    }); 

    describe('Example 2: startWith for initial scan value', () => {
        it('should start with initial scan value', () => {
            const source = Observable.of('World!', 'Goodbye', 'World!');
            const example = source
                .startWith('Hello')
                .scan((acc, curr) => `${acc} ${curr}`);
            const values = {a: 'Hello', b: 'Hello World!', c: 'Hello World! Goodbye', d: 'Hello World! Goodbye World!'};
            const expected = '(abcd|)';

            expectObservable(example).toBe(expected, values);
        });
    }); 

    describe('Example 3: startWith multiple values', () => {
        it('should start with -3, -2, -1', () => {
            //reducing interval for testing purposes
            const source = Observable.interval(-1, rxTestScheduler);
            const example = source.startWith(-3, -2, -1).take(4);
            const values = {a: -3, b: -2, c: -1, d: 0};
            const expected = '(abcd|))';

            expectObservable(example).toBe(expected, values);
        });
    });       
});