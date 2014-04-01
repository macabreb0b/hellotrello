window.Trellino = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function () {
    alert('hello from backbone!')
		this.boards = new Trellino.Collections.Boards()

		new Trellino.Routers.BoardsRouter({
			rootEl: $('#content')
		})
		Backbone.history.start()
  }
};

$(function() {
  var windowHeight=$(window).height()
  $('.container').height(windowHeight - 50)

  $(window).resize(function() {
    var windowHeight=$(window).height()
    $('.container').height(windowHeight - 50)
  })

	Trellino.initialize()
})