var hello = require("./custom_hello");
var ts = require("./custom_hello");

var gb = require("./custom_goodbye");

var myMod = require("./my_module");

hello();
ts.test();
hello.test();

gb.goodbye();

myMod.foo();
myMod.bar();