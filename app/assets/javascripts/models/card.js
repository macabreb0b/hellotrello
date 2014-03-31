Trellino.Models.Card = Backbone.Model.extend({
	initialize: function() {

	},

  urlRoot: function() {
    console.log('looking for card url')
    return '/cards'
  }
})