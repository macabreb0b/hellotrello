window.Trellino.Collections.Boards = Backbone.Collection.extend({
	url: '/boards',

	model: Trellino.Models.Board,

	getOrFetch: function(id) {
		var model = this.get(id);
		var boards = this

		if(model){
			model.fetch();
			return model;
		} else {
			model = new Trellino.Models.Board({ id: id });
			model.fetch({
				success: function() { feeds.add(model) }
			});
			return model;
		}
	}

})