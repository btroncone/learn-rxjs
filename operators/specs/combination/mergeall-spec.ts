declare var describe, it, expect, hot, cold, expectObservable, expectSubscriptions, rxTestScheduler, beforeEach;
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeall';

describe('The concat operator examples', () => {
    describe('Example 1 - mergeAll with promises', () => {
        it('should emit the result of promises', (done) => {
            const results = [];
            const myPromise = val => new Promise(resolve => resolve(`Result: ${val}`))
            const source = Observable.of(1,2,3);
            const example = source
                .map(val => myPromise(val))
                .mergeAll();
            const expected = ['Result: 1', 'Result: 2', 'Result: 3'];
            example.subscribe({
                next: val => results.push(val),
                complete: () => {
                    expect(results).toDeepEqual(expected);
                    done();
                }
            });
        });
    });  
});