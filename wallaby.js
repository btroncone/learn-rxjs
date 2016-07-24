module.exports = wallaby => ({
  files: [
    {pattern: 'operators/specs/helpers/*.ts', instrument: false}
  ],

  tests: ['operators/specs/**/*-spec.ts'],
  compilers: {
    '**/*.ts': wallaby.compilers.typeScript({
      module: 1,  // commonjs
      target: 1,  // ES5
    })
  }, 
  env: {
    type: 'node'
  },
  testFramework: 'jasmine',
  setup: function (wallaby) {
    require('./operators/specs/helpers/test-helper'); 
  }
});