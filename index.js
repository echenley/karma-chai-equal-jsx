var path = require('path');

function createPattern(file) {
    return {
        pattern: file,
        included: true,
        served: true,
        watched: false
    };
}

function _isDuplicate(files, file) {
    var result = false;
    for (var i = 0; i < files.length; i++) {
        var pattern = files[i].pattern
        result = result || endsWith(path.relative(__dirname, file))(pattern);
    }
    return result;
}

function framework(files) {
    var isDuplicate = _isDuplicate.bind(this, files);

    files.unshift(createPattern(path.join(__dirname, 'chai-adapter.js')));

    var chaiPath = path.resolve(require.resolve('chai'), '../chai.js');
    if (!isDuplicate(chaiPath)) {
        files.unshift(createPattern(chaiPath));
    }

    var chaiEqualJSXPath = path.resolve(require.resolve('chai-equal-jsx'), '/chai-equal-jsx.js');
    if (!isDuplicate(chaiEqualJSXPath)) {
        files.push(createPattern(chaiEqualJSXPath));
    }
}

framework.$inject = ['config.files'];
module.exports = {
    'framework:chai-equal-jsx': ['factory', framework]
};
