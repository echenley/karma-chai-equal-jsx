var path = require('path');

function createPattern(file) {
    return {
        pattern: file,
        included: true,
        served: true,
        watched: false
    };
}

function endsWith(substr) {
    return function(str) {
        return str.indexOf(substr) >= 0 && str.indexOf(substr) === (str.length - substr.length);
    };
};

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

    // Chai
    var chaiPath = path.resolve(require.resolve('chai'), '../chai.js');
    if (!isDuplicate(chaiPath)) {
        files.unshift(createPattern(chaiPath));
    }

    // react-element-to-jsx-string
    var reactElementToJSXStringPath = require.resolve('react-element-to-jsx-string');
    if (!isDuplicate(reactElementToJSXStringPath)) {
        files.push(createPattern(reactElementToJSXStringPath));
    }

    // chai-equal-jsx
    var chaiEqualJSXPath = require.resolve('chai-equal-jsx');
    if (!isDuplicate(chaiEqualJSXPath)) {
        files.push(createPattern(chaiEqualJSXPath));
    }
}

framework.$inject = ['config.files'];
module.exports = {
    'framework:chai-equal-jsx': ['factory', framework]
};
