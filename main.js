/* global hexo */

'use strict';

var renderer = require('./lib/renderer');

hexo.extend.renderer.register('yk', 'html', renderer);
