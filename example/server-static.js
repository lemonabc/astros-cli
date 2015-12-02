var nodeUtil = require('util');

// var astro =
require('astros');

// console.log(astro);

// astro.plugin('asset.readFileSync', function(code, ftype, project) {
//     if (this.request.theme && ftype == 'css') {
//         if (this.modType == 'cssLib' && this.name == 'variables') {
//             var _t = this.clone();
//             _t.name = _t.name + '-' + this.request.theme;
//             return _t.readFileSync('css');
//         }
//     }
//     return code;
// });
// astro.plugin('asset.resolve', function(info, args, project) { //return info;

// });

astro.setSite(__dirname);

astro.listen(3104);