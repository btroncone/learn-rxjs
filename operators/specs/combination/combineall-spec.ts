declare var describe, it, expect, hot, cold, expectObservable, expectSubscriptions, rxTestScheduler, beforeEach;
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/combineall';
import 'rxjs/add/operator/take';

describe('The combineAll operator examples', () => {
    describe('Example 1 - mapping to an inner observable', () => {
        it('should emit the result of both observables as an array', (done) => {
            let results = [];
            const source = Observable.interval(1000).take(2);
            const example = source.map(val => Observable.of(val));
            const combined = example.combineAll();
            const expected = [[0,1]];
            combined.subscribe({
                next: val => results.push(val),
                complete: () => {
                    expect(results).toDeepEqual(expected);
                    done();
                }
            });
        });
    });  
});