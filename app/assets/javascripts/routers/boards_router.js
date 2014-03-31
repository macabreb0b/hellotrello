window.Trellino.Routers.BoardsRouter = Backbone.Router.extend({
	initialize: function(options) {
		this.collection = Trellino.boards;
		// this.collection.fetch()
		// console.log(this.collection)
		this.$rootEl = options.rootEl;
	},

	routes: {
		"": "boardsIndex",
		"boards/:id": "showBoard"
	},

	boardsIndex: function() {
		var that = this;
		this.collection.fetch({
			success: function(collection, response, options) {
				var indexView = new Trellino.Views.BoardsIndex()
				indexView.collection = collection

				that._swapView(indexView)
			}
		})
	},

	showBoard: function(id) {
		var that = this;
		this.collection.fetch({
			success: function(collection, response, options) {
				var board = that.collection.getOrFetch(id)
				var lists = board.lists();
				lists.fetch({
					success: function(collection, response, options) {

					}
				});

				var showView = new Trellino.Views.ShowBoardView({
					model: board,
					collection: lists
				});

				that._swapView(showView)
			}
		})

	},


	_swapView: function(newView) {
		if(this.currentView) { this.currentView.remove() }

		this.$rootEl.html(newView.render().$el)
		this.currentView = newView
	}
})