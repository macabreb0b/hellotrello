window.Trellino.Views.ShowBoardView = Backbone.View.extend({
	initialize: function(options) {

		this.listenTo(this.collection, 'sync add remove', this.render);
		this.listenTo(this.model, 'sync', this.render);

		$('body').css("background-color", "rgb(35, 113, 159) !important");
	},

	template: JST['boards/show'],

	events: {
		'click #remove': 'removeBoard',
		'click .showForm': 'toggleNewList',
		'click button#newList': 'addList',
		'click #hideForm': 'toggleNewList',
		'click .list-menu': 'toggleListMenu',
		'click .remove-list': 'removeList',
		'click a.add-card': 'showNewCard',
		'click .hide-card-form': 'hideCardForm',
		'submit form.new-card': 'addCard',
		'click .card-menu': 'toggleCardMenu',
		'click .remove-card': 'removeCard',
		'mouseover ul.card-list li': 'showCardChevron',
		'mouseout ul.card-list li': 'hideCardChevron'
		// look for hide all popovers event in trellino.js
	},

	render: function() {

		var renderedContent = this.template({
			board: this.model,
			lists: this.collection.sort()
		});

		this.$el.html(renderedContent);
		this.$el.append()

		this.makeSortable()
    // move this into a function
    this.makeResizable()

		return this;
	},

	removeBoard: function(event) {
		event.preventDefault();

		var that = this;
		this.model.destroy({
			success: function(model, response) {
				that.remove()
				Backbone.history.navigate('#/')
			}
		});

	},

	toggleNewList: function(event) {
		event.preventDefault();

		var $target = $(event.currentTarget);

		if($target.is('button')){
			$target.parent().addClass('showForm')
			$target.parent().html('Add a list...');
		} else {
			var form = JST['lists/form']({
				board: this.model
			});
			$target.removeClass('showForm');
			$target.html(form);
		}
	},


	addList: function(event) {
		event.preventDefault();

		var $form = $($(event.currentTarget).parent());
		var $lastItem = $form.parent()
		var data = $form.serializeJSON();

		var that = this
		var newList = this.collection.create(data, {
			success: function(response, model) {


				var list = new Trellino.Models.List(model)
				that.collection.add(list)
			}
		})
	},

	addCard: function(event) {
		event.preventDefault();

		var $form = $(event.currentTarget);
		var data = $form.serializeJSON();

		var id = $form.data('list-id')
		var list = this.collection.get(id)

		var that = this
		var newCard = list.cards().create(data, {
			success: function(response, model) {
				list.trigger('sync')
			}
		})
	},

	showNewCard: function(event) {
		event.preventDefault();

		$target = $(event.currentTarget);
		var id = $target.data('id')
		var list = this.collection.get(id)

		var form = JST['cards/new']({
			list: list
		});
		$target.siblings('ul').append(form);
		$target.remove();
	},

	hideCardForm: function(event) {
		event.preventDefault();

		$target = $(event.currentTarget);
		var id = $target.data('id')
		var formSpan = $target.parent().parent()
    var ul = formSpan.parent()

		ul.after('<a href="#" class="add-card" data-id="' + id + '"><div class="add-card">Add a card...</div></a>')
		formSpan.remove();
	},

	toggleListMenu: function(event) {
		event.preventDefault();

		var $this = $(event.currentTarget)

		var id = $this.data('id')
		$this.popover({
			'html': 'true',
			'content': '<span class="list-popover"><a href="#" class="remove-list" data-id=' +
			 		id + '>remove list</a></span>',
			'title': 'list actions'
		})
		$this.popover('toggle')
	},

	toggleCardMenu: function(event) {
		event.preventDefault();

		var $this = $(event.currentTarget)
		var id = $this.data('id')
		var listId = $this.data('list-id')

		$this.popover({
			'html': 'true',
			'content': '<span class="list-popover"><a href="#" class="remove-card" data-id="' +
			 		id + '" data-list-id="' + listId + '">remove card</a></span>',
			'title': 'card actions'
		})
		$this.popover('toggle')
	},

	removeList: function(event) {
		event.preventDefault();

		var $this = $(event.currentTarget)
		var id = $this.data('id')

		var list = this.collection.get(id)
		// this.collection.remove(list) // Backbone does this automatically on calling "destroy"
		list.destroy();
	},

	removeCard: function(event) {
		event.preventDefault();

		var $this = $(event.currentTarget)
		var listId = $this.data('list-id')
		var list = this.collection.get(listId)
		// console.log(list)

		var cardId = $this.data('id')
		var card = list.cards().get(cardId)

		card.destroy();
		list.trigger('sync')
	},

	showCardChevron: function(event) {
		event.preventDefault();

		var $this = $(event.currentTarget)
		$this.addClass('active')

		// $this.children('.card-menu').show() // adding a class is easier
	},

	makeSortable: function() {

    var that = this

		$('.card-list').sortable({
      cursor: 'move',
      connectWith: '.card-list',
      stop: function(event, ui) {
        // console.log(event.target) // this is the enclosing UL
        // console.log(event.currentTarget) // this is the window...?
        var $card = ui.item;
        var newListId = $card.parent().data('list-id')
        var listId = $card.data('list-id');
        var cardId = $card.data('card-id');
        var prevRank = ( $card.prev().data('card-rank') || 0 );
        var nextRank = ( $card.next().data('card-rank') || prevRank + 1);
        var newRank = ( nextRank + prevRank ) / 2;

        var card = that.collection.get(listId).cards().get(cardId);
        console.log("currentList Id= " + listId)
        console.log("newListId = " + newListId)
        if(newListId !== listId) {
          that.collection.get(newListId).cards().add(card);
          that.collection.get(listId).cards().remove(card);
        };

        card.save({
          rank: newRank,
          list_id: newListId
        })
      }
		}).disableSelection();

		$('.lists-list').sortable({
      cursor: 'pointer',
      placeholder: 'lists-list-placeholder',
      stop: function(event, ui) {

        var $list = ui.item;
        var listId = $list.data('list-id');

        var prevRank = ( $list.prev().data('list-rank') || 0 );
        var nextRank = ( $list.next().data('list-rank') || (prevRank + 1) );
        var newRank = (nextRank + prevRank) / 2;
        // console.log("my rank is going from " + $list.data('list-rank') + "to " + newRank);
        var list = that.collection.get(listId);

        list.save({
          rank: newRank
        });
      }
		}).disableSelection();
	},

  makeResizable: function() {
    var windowHeight=$(window).height()
    $('.module-lists').height(windowHeight - 50 - 40 - 15) // -top nav, -module title
    $('.card-list').css('max-height', windowHeight - 50 - 40 - 86 - 25) // -title / add card / etc - scrollbar

    $(window).resize(function() {
      var windowHeight=$(window).height()
      $('.module-lists').height(windowHeight - 50 - 40 - 10)
      $('.card-list').css('max-height', windowHeight - 50 - 40 - 86 - 20)
    })
  },

	hideCardChevron: function(event) {
		event.preventDefault();

		var $this = $(event.currentTarget)
		$this.removeClass('active')
		// $this.children('.card-menu').hide()
	}


})