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
        el2: '#recent-articles-container',
        render: function () {
            var self = this;
            var posts = new Posts();
            posts.fetch({
                success: function(posts) {
                    var source = $("#post-template").html(),
                        template = Handlebars.compile(source),
                        context,
                        html;

                    var source2 = $("#recent-article-template").html(),
                        template2 = Handlebars.compile(source2);
                    for (var i in posts.models) {
                        context = {
                            title: posts.models[i].attributes.value.title,
                            body: posts.models[i].attributes.value.body
                        };
                        html = template(context);
                        $(self.el).append(html);
                        html2 = template2(context);
                        $(self.el2).append(html2);
                    }
                }
            });
        }
    });

  
    posts = new Posts;
    postview = new PostView({el: $('#posts-container')});
})(jQuery);
