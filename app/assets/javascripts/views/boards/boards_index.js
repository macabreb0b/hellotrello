window.Trellino.Views.BoardsIndex = Backbone.View.extend({
	initialize: function() {
		this.template = JST['boards/index'];
		$('body').css("background-color", "#f6f6f6")

	},

	events: {
		'click button#newBoard': 'toggleNewBoard',
		'submit form': 'createNewBoard'
	},

	render: function() {
		// this.collection.fetch()
		var renderedContent = this.template({
			boards: this.collection
		})

		this.$el.html(renderedContent);

		return this
	},

	toggleNewBoard: function(event) {
		event.preventDefault();
		var $this = $(event.currentTarget);

		if($this.siblings()[0]){
			$this.siblings('form').remove();
		} else {
			var newBoardContent = JST['boards/new']();
			$this.after(newBoardContent);
		}
	},

	createNewBoard: function(event) {
		event.preventDefault();
		var $form = $(event.currentTarget);
		var data = $form.serializeJSON();

		// console.log(data)

		var newBoard = Trellino.boards.create(data, {
			success: function(model, repsonse) {
				var id = model.id;
				Backbone.history.navigate("#/boards/"+ id);
			}
		})
	}
})