/* actions.js
 *
 * All actions are defined in this module. It is the 'business' logic of the
 * application.
 *
 */
var http = require('http');

var actions = module.exports = {
    index: function () {
        this.render('./views/index.html');
    },
    posts: function() {
        var self = this;
        var couchOptions = {
            host: 'localhost',
            port: '5984',
            path: '/blog/_design/all/_view/posts'
        };
        var data = '';
        var req = http.request(couchOptions, function(res) {
            res.on('data', function(chunk) {
                data += chunk;
            }).on('end', function(e) {
                self.json(JSON.parse(data)['rows']);
            });
        }).on('error', function(e) {
            console.log(e.message);
        });
        req.end();
    }
}
