'use strict';

var indent = require('../../../lib/rules/indent');
var RuleTester = require('eslint').RuleTester;

var ruleTester = new RuleTester();
ruleTester.run('indent', indent, {
  valid: [
    {
      code: [
        '',
        'obj.startChain()',
        '  .firstFunction()',
        '  .secondFuncion()',
        '  .thirdFunction()',
        '  .fourtFuncion()',
      ].join('\n'),
    },
    {
      code: [
        '',
        'obj',
        '  .startChain()',
        '  .firstFunction()',
        '  .secondFuncion()',
        '  .thirdFunction()',
        '  .fourtFuncion()',
        '',
      ].join('\n'),
    },
    {
      code: [
        '',
        'obj' ,
        '  .getPromise()',
        '  .then(function() {',
        '    console.log("wow");',
        '  })',
        '  .then(callback)',
        '  .catch(callback)',
      ].join('\n'),
    },
    {
      code: [
        '',
        'obj.getStream()',
        '  .on("data", handleData)',
        '  .on("error", handleError)',
        '  .on("finish", handleFinish)',
      ].join('\n'),
    },
    {
      code: [
        '',
        'obj.getStream()',
        '.on("data", handleData)',
        '.on("error", handleError)',
        '.on("finish", handleFinish)',
      ].join('\n'),
      options: [{indentation: 0}],
    },
    {
      code: [
        '',
        'obj',
        '  .startChain()',
        '  .firstFunction()',
        '  .secondFuncion()',
        '  .thirdFunction()',
        '  .fourtFuncion()',
      ].join('\n'),
      options: [{new_line_head: true}],
    },
  ],
  invalid: [
    {
      code: [
        '',
        'obj.startChain()',
        '.firstFunction()',
        '  .secondFuncion()',
        '.thirdFunction()',
        '  .fourtFuncion()',
      ].join('\n'),
      errors: [
        { message: indent.errorMessages.CHAIN_IS_NOT_INDENT },
        { message: indent.errorMessages.CHAIN_IS_NOT_INDENT },
        { message: indent.errorMessages.CHAIN_IS_NOT_INDENT },
        { message: indent.errorMessages.CHAIN_IS_NOT_INDENT },
      ],
    },
    {
      code: [
        '',
        'pippo.getPromise().wow().then().then()',
      ].join('\n'),
      errors: [
        { message: indent.errorMessages.ONE_LINE_CHAIN },
        { message: indent.errorMessages.ONE_LINE_CHAIN },
        { message: indent.errorMessages.CHAIN_IS_NOT_INDENT },
      ],
    },
    {
      code: [
        '',
        'obj.startChain()',
        '.firstFunction()',
        '.secondFuncion()',
        '.thirdFunction()',
        '.fourtFuncion()',
      ].join('\n'),
      errors: [
        { message: indent.errorMessages.CHAIN_IS_NOT_INDENT },
      ],
    },
    {
      code: [
        '',
        'obj.startChain()',
        '  .firstFunction()',
        '  .secondFuncion()',
        '  .thirdFunction()',
        '  .fourtFuncion()',
      ].join('\n'),
      options: [{new_line_head: true}],
      errors: [
        { message: indent.errorMessages.FORCE_NEW_LINE_FOR_HEAD_CHAIN },
      ],
    },
  ],
});
