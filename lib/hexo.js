exports.apply = function (scope, exports, runtime) {
	require('./hexo-article.yk').apply(scope, exports, runtime);
	exports.$$article$$ = new runtime.Macro(function ($body) {
		const s1 = Object.create(this);
		const options = s1['hexo-options'];

		this.exports.$$render$$ = function (callback) {

			let holes = 0;
			let filled = 0;
			let holeDefs = [];
			let articleSet = false;
			let article = '';

			s1['give-hole'] = function () {
				holes += 1;
				return holes;
			}
			s1['leave-hole'] = function (hole) {
				return `<!-- %YOUKI% hole ${hole} %% -->`
			}
			s1['fill-hole'] = function (hole, content) {
				article = article.replace(`<!-- %YOUKI% hole ${hole} %% -->`, content);
				holeDefs[hole] = content;
				filled += 1;
				check();
			}
			s1['delay'] = function (f) { setTimeout(f, 1) }

			article = scope['youki-article'].apply(s1, [s1, $body]);
			articleSet = true;

			for (let h = 0; h <= filled; h++) {
				if (holeDefs[h]) {
					article = article.replace(`<!-- %YOUKI% hole ${h} %% -->`, holeDefs[h]);
				}
			}

			function check() {
				if (articleSet && filled >= holes) callback(null, article);
			}
			return check();
		};
	});
}