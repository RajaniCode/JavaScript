// http://stackoverflow.com/questions/22072926/node-js-iterator-interface

// Node.js Iterator interface

"use strict";

function Range(low, high){
  this.low = low;
  this.high = high;
}
Range.prototype[Symbol.iterator] = function(){
  return new RangeIterator(this);
};

function RangeIterator(range){
  this.range = range;
  this.current = this.range.low;
}
RangeIterator.prototype.next = function(){
  let result = {done: this.current > this.range.high, value: this.current};
  this.current++;
  return result;
};

var range = new Range(3, 5);
// for (let i of range) {
// for (const i of range) {
for (var i of range) {
  console.log(i);
}