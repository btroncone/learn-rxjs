declare var describe, it, expect, hot, cold, expectObservable, expectSubscriptions, rxTestScheduler, beforeEach;
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/combinelatest';

describe('The combineLatest operator examples', () => {
    describe('Example 1 - Combining observables emitting at 3 intervals', () => {
        it('should combine three observables emitting at seperate intervals', () => {
            const t1 = hot(  'a----b-----c---|');
            const t2 = hot(  '-----e------f--------|');
            const t3 = hot(  '-------------h-----i---------|')
            const expected = '-------------y-----z---------|';
            var combined = Observable.combineLatest(t1, t2, t3, (a,b,c) => a + b + c);
            expectObservable(combined).toBe(expected, { y: 'cfh', z: 'cfi'});
        });
    });  
});