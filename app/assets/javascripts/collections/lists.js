window.Trellino.Collections.Lists = Backbone.Collection.extend({
	initialize: function(models, options) {
		this.board = options.board;
	},

	comparator: function(list) {
		return list.get('rank')
	},

	url: function() {
		return this.board.url() + '/lists'
	},

	model: Trellino.Models.List

})