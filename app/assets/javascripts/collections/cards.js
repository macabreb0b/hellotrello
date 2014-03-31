Trellino.Collections.Cards = Backbone.Collection.extend({
	initialize: function() {
	},

	comparator: function(card) {
		return card.get('rank')
	},

	model: Trellino.Models.Card,

	url: '/cards'
})