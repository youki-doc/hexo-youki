'use strict';

const youki = require('youki');
const assign = require('object-assign');

function render(data, _options, callback) {
	const options = assign({ libs: [] }, this.config.youki, _options);
	const scope = youki.newScope();
	scope['hexo-options'] = options;
	scope['load-library'](__dirname + '/hexo.js');
	youki.loadPointYouki(scope, data.path || this.base_dir + "index.yk");
	youki.loadText(scope, '[$$article$$]::\n' + data.text, data.path);
	scope['$$render$$'].call(scope, callback);
}

module.exports = render;
