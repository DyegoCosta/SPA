define(['Backbone'], function(Backbone) {

	return ProductView = Backbone.View.extend({
		events: {
			"click a.increase": "increase",
			"click a.decrease": "decrease",
			"click a.remove": "delete",
			"dblclick div.view": "edit",
			"focusout input" : "save",
			"keypress input" : "finishEdit"
		},

		tagName:  "li",

		template: _.template('<div class="view"><%=title%> <span class="badge"><%=quantity%></span></div><input type="text" class="new-title" value="<%=title%>" /><div class="product-options"><a class="increase icon-plus-sign"></a><a class="decrease icon-minus-sign"></a><a class="remove icon-trash"></a></div>'),

		initialize: function(options){
			model: options.model;
      		
      		this.model.bind('change', this.render, this);
      		this.model.bind('destroy', this.remove, this);
		},

		increase: function(){
			this.model.set({ quantity: parseInt(this.model.get('quantity')) + 1 }).save()
		},

		decrease: function(){
			this.model.set({ quantity: parseInt(this.model.get('quantity')) - 1 }).save()
		},

		delete: function(){		
			this.model.destroy();
		},

		edit: function() {
      		this.$el.addClass('editing');
      		this.$('input').focus();
    	},

    	finishEdit: function(e){
    		if (e.keyCode != 13) return;

			this.save();
    	},

    	save: function(){
    		var newTitle = this.$('input').val();
    		
    		if(newTitle && newTitle != this.model.get('title'))
    			this.model.set({ title: newTitle }).save();
    		else
    			this.render();
    	},

		render: function(){
			this.$el.html(this.template(this.model.toJSON()));
			this.$el.removeClass();
			
			var quantity = this.model.get('quantity')

			if(quantity < 10)
				this.$el.addClass('out-of-stock');
			
			else if(quantity < 20)
				this.$el.addClass('running-out');
		}
	});

});