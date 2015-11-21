var path = require('path');

function createPattern(file) {
    return {
        pattern: file,
        included: true,
        served: true,
        watched: false
    };
}

function framework(files) {
    files.unshift(createPattern(__dirname + '/chai-adapter.js'));
    files.unshift(createPattern(path.dirname(require.resolve('chai')) + '/chai.js'));
    files.unshift(createPattern(path.dirname(require.resolve('chai-equal-jsx')) + '/chai-equal-jsx.js'));
}

framework.$inject = ['config.files'];
module.exports = {
    'framework:chai-equal-jsx': ['factory', framework]
};
