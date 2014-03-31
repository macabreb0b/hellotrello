window.Trellino.Models.Board = Backbone.Model.extend({

	initialize: function() {
	},

	lists: function(response) {
		// check if _lists
		// return new empty  collection if not
		if(!this._lists) {
			this._lists = new Trellino.Collections.Lists([], {
				board: this
			});
		};
		return this._lists
	},

	parse: function(response, options) {
		// call this.lists().set(response.lists) in this function
		if(response.lists) {
			this.lists().set(response.lists);
			delete response.lists;
		}

		return response
	}

})