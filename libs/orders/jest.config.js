module.exports = {
  name: 'orders',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/orders',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
