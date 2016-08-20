declare var describe, it, expect, hot, cold, expectObservable, expectSubscriptions, rxTestScheduler, beforeEach;
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';

describe('The catch operator examples', () => {
    
    describe('Example 1 - Catching error from observable', () => {
        it('catch an error', () => {
            const source = cold('#')
            const example =  source.catch(_ => Observable.of('Error Caught!'));
            const expected = '(a|)';

            expectObservable(example).toBe(expected, {a: 'Error Caught!'});
        });
    });

    describe('Example 2 - Catching rejected promise', () => {
        it('catch an error from a rejected promise', (done) => {
            let result;
            const badPromise = val => new Promise((resolve, reject) => reject('Rejected!'))
            const source = Observable.of(true);
            const example =  source
                .mergeMap(val => badPromise(val))
                .catch(err => Observable.of(err));

            const expected = 'Rejected!';

            example.subscribe({
                next: val => result = val,
                complete: () => {
                    expect(result).toBe('Rejected!');
                    done();
                }
            });
        });
    });         
});