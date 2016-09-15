'use strict';

var errorMessages = {
  CHAIN_IS_NOT_INDENT: 'This call is not indent correctly',
  ONE_LINE_CHAIN: 'Indent your chain',
  FORCE_NEW_LINE_FOR_HEAD_CHAIN: '',
};

module.exports = {
  meta: {
    docs: {
      description: 'Indent chain correctly',
      recommended: true,
    },
    schema: [
      {
        type: 'object',
        properties: {
          indentation: {
            type: 'number',
          },
          new_line_head: {
            type: 'boolean',
          },
        },
        additionalProperties: false,
      },
    ],
  },

  create: function(context) {
    var options = context.options[0] || {};
    var indentationLevel = options.hasOwnProperty('indentation') ? options.indentation : 2;
    var forceNewLineForHeadChain = options.hasOwnProperty('new_line_head') ? options.new_line_head : false;

    return {
      CallExpression: function(node) {
        var isAChain = node.callee.object.type === 'CallExpression';
        if (!isAChain) return;

        var isASecondChain = node.callee.object.callee.object.type === 'CallExpression';
        var currentNodeIdentationLevel = node.callee.property.loc.start.column;

        if (isASecondChain) {
          if (node.callee.object.callee.property.loc.start.line === node.callee.property.loc.start.line) {
            context.report(node, errorMessages.ONE_LINE_CHAIN);
          } else if (node.callee.object.callee.property.loc.start.column !== currentNodeIdentationLevel) {
            context.report(node, errorMessages.CHAIN_IS_NOT_INDENT);
          }
        } else {
          if (node.callee.object.callee.object.loc.start.column + indentationLevel + 1 !== currentNodeIdentationLevel) {
            context.report(node, errorMessages.CHAIN_IS_NOT_INDENT);
          }
          if (forceNewLineForHeadChain) {
            if (node.callee.object.callee.object.loc.start.line === node.callee.object.callee.property.loc.start.line) {
              context.report(node.callee.object.callee, errorMessages.FORCE_NEW_LINE_FOR_HEAD_CHAIN);
            }
          }
        }
      },
    };
  },
  errorMessages: errorMessages,
};
