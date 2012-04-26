(function ($) {

    Post = Backbone.Model.extend({
        title: null,
        body: null
    });

    Posts = Backbone.Collection.extend({
        model: Post,
        url: '/posts'
    });

    PostView = Backbone.View.extend({
        initialize: function () {
            this.render();
        },
        el: '#posts-container',
        render: function () {
            var self = this;
            var posts = new Posts();
            posts.fetch({
                success: function(posts) {
                    for (var i in posts.models) {
                        var html = '<li>' + posts.models[i].attributes.value.title + '</li>'+
                                   '<li>' + posts.models[i].attributes.value.body + '</li>';
                        $(self.el).append(html);
                    }
                }
            });
        }
    });
  
    posts = new Posts;
    postview = new PostView({el: $('#posts-container')});
})(jQuery);
