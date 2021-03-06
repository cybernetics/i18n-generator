'use strict';

var fs = require('fs');
var i18nGenerator = require('./i18n-generator.js');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.i18nGenerator = {
  setUp: function(done) {
    // setup here
    done();
  },
  generate: function (test) {
      test.expect(8);

      i18nGenerator('test/input.txt', 'test/temp');

      // exists check
      var en = fs.existsSync('./test/temp/en.json'),
          de = fs.existsSync('./test/temp/de.json'),
          my = fs.existsSync('./test/temp/my.json'),
          zh = fs.existsSync('./test/temp/zh_TW.json');

      test.equal(en, true, 'en.json should be generated');
      test.equal(de, true, 'fr.json should be generated');
      test.equal(my, true, 'my.json should be generated');
      test.equal(zh, true, 'zh.json should be generated');

      // content check
      var enJson = fs.readFileSync('./test/temp/en.json'),
          deJson = fs.readFileSync('./test/temp/de.json'),
          myJson = fs.readFileSync('./test/temp/my.json'),
          zhJson = fs.readFileSync('./test/temp/zh_TW.json');

      test.equal(enJson, '{"you":"you","I":"I","love":"love","eat":"eat","ilovegithub":"i love github"}', 'en json');
      test.equal(deJson, '{"you":"Du","I":"ich","love":"liebe","eat":"essen","ilovegithub":"ich liebe Github"}', 'de json');
      test.equal(myJson, '{"you":"kamu","I":"Saya","love":"cinta","eat":"makan","ilovegithub":"Saya cinta pada Github"}', 'my json');
      test.equal(zhJson, '{"you":"你","I":"我","love":"喜歡","eat":"吃","ilovegithub":"我愛 Github"}', 'zh_TW json');

      test.done();
  },
  optionsSplit: function (test) {
      test.expect(8);

      i18nGenerator('test/inputComma.txt', 'test/temp', false, ',');

      // exists check
      var en = fs.existsSync('./test/temp/en.json'),
          de = fs.existsSync('./test/temp/de.json'),
          my = fs.existsSync('./test/temp/my.json'),
          zh = fs.existsSync('./test/temp/zh_TW.json');

      test.equal(en, true, 'en.json should be generated');
      test.equal(de, true, 'fr.json should be generated');
      test.equal(my, true, 'my.json should be generated');
      test.equal(zh, true, 'zh.json should be generated');

      // content check
      var enJson = fs.readFileSync('./test/temp/en.json'),
          deJson = fs.readFileSync('./test/temp/de.json'),
          myJson = fs.readFileSync('./test/temp/my.json'),
          zhJson = fs.readFileSync('./test/temp/zh_TW.json');

      test.equal(enJson, '{"you":"you","I":"I","love":"love","eat":"eat","ilovegithub":"i love github"}', 'en json');
      test.equal(deJson, '{"you":"Du","I":"ich","love":"liebe","eat":"essen","ilovegithub":"ich liebe Github"}', 'de json');
      test.equal(myJson, '{"you":"kamu","I":"Saya","love":"cinta","eat":"makan","ilovegithub":"Saya cinta pada Github"}', 'my json');
      test.equal(zhJson, '{"you":"你","I":"我","love":"喜歡","eat":"吃","ilovegithub":"我愛 Github"}', 'zh_TW json');

      test.done();
  },
  getMethod: function (test) {
      test.expect(4);

      var enObject = {"you":"you","I":"I","love":"love","eat":"eat","ilovegithub":"i love github"},
          deObject = {"you":"Du","I":"ich","love":"liebe","eat":"essen","ilovegithub":"ich liebe Github"},
          myObject = {"you":"kamu","I":"Saya","love":"cinta","eat":"makan","ilovegithub":"Saya cinta pada Github"},
          zhObject = {"you":"你","I":"我","love":"喜歡","eat":"吃","ilovegithub":"我愛 Github"};

      i18nGenerator.get('test/inputComma.txt', ',' ,function (err, data) {
          test.deepEqual(data.en, enObject, 'en object');
          test.deepEqual(data.de, deObject, 'de object');
          test.deepEqual(data.my, myObject, 'my object');
          test.deepEqual(data.zh_TW, zhObject, 'zh_TW object');
      });

      test.done();
  },
  browserify: function (test) {
      test.expect(4);

      var input = 'i18n=> | en | zh_TW | de | my\nyou | you | 你 | Du | kamu\nI | I | 我 | ich | Saya\nlove | love | 喜歡 | liebe | cinta\neat | eat | 吃 | essen | makan\nilovegithub | i love github | 我愛 Github | ich liebe Github | Saya cinta pada Github';

      var enObject = {"you":"you","I":"I","love":"love","eat":"eat","ilovegithub":"i love github"},
          deObject = {"you":"Du","I":"ich","love":"liebe","eat":"essen","ilovegithub":"ich liebe Github"},
          myObject = {"you":"kamu","I":"Saya","love":"cinta","eat":"makan","ilovegithub":"Saya cinta pada Github"},
          zhObject = {"you":"你","I":"我","love":"喜歡","eat":"吃","ilovegithub":"我愛 Github"};

      i18nGenerator.get(input, '|', function (err, data) {
          test.deepEqual(data.en, enObject, 'en object');
          test.deepEqual(data.de, deObject, 'de object');
          test.deepEqual(data.my, myObject, 'my object');
          test.deepEqual(data.zh_TW, zhObject, 'zh_TW object');
      });

      test.done();
  }
};
