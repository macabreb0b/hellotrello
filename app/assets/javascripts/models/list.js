window.Trellino.Models.List = Backbone.Model.extend({
	initialize: function() {

	},

	cards: function(response) {
		// check if _lists
		// return new empty  collection if not
		if(!this._cards) {
			this._cards = new Trellino.Collections.Cards([], {
				list: this
			});
		};
		return this._cards
	},

	parse: function(response, options) {
		// call this.lists	().set(response.lists) in this function
		if(response.cards) {
			this.cards().set(response.cards);
			delete response.cards;
		}
		return response
	}
})