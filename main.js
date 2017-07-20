/* global hexo */

'use strict';

var renderer = require('./lib/renderer');
renderer.disableNunjucks = true;

hexo.extend.renderer.register('yk', 'html', renderer);
