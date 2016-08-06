declare var describe, it, expect, hot, cold, expectObservable, expectSubscriptions, rxTestScheduler, beforeEach;
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/concatAll';
import 'rxjs/add/operator/map';

describe('The concatAll operator examples', () => {
    describe('Example 1 - concatAll with observable', () => {
        it('should subscribe to inner observables, emitting the result', () => {
            const values = {
                a: 1,
                b: 2,
                c: 3,
                d: 1 + 10,
                e: 2 + 10,
                f: 3 + 10
            };
            const source = cold('---a---b---c|', values);
            const example = source
                .map(val => Observable.of(val + 10))
                .concatAll();
            const expected =    '---d---e---f|';

            expectObservable(example).toBe(expected, values);
        });
    }); 

    describe('Example 2 - concatAll with promise', () => {
        it('should emit the result of promises', (done) => {
            let results = [];
            const samplePromise = val => new Promise(resolve => resolve(val + 10));
            const values = {
                a: 1,
                b: 2,
                c: 3,
                d: 1 + 10,
                e: 2 + 10,
                f: 3 + 10
            };
            const source = Observable.of(1,2,3);
            const example = source
                .map(val => samplePromise(val))
                .concatAll();
            
            example.subscribe({
                next: val => results.push(val),
                complete: () => {
                    expect(results).toDeepEqual([11,12,13]);
                    done();
                }
            });           
        });
    });   
});