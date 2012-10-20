define(['views/ProductView', 'models/Product'], function(ProductView, Product){

	var productView;
	var product;

	describe('Product view', function(){
		
		beforeEach(function(){
			product = new Product({ title: 'some title', quantity: '10' });
			spyOn(product, 'save');
	 		
	 		productView = new ProductView({model: product});
	 		productView.render();
		});

		it('has template', function(){
			expect(productView.template).toBeDefined();
		});

		it('tag name should be li', function(){
			expect(productView.tagName).toBe('li');
		});

		it('should increase the products quantity by 1', function(){
			var model = new Product({quantity: 10});
			spyOn(model, 'save');
			productView.model = model;

			productView.increase();

			expect(model.get('quantity')).toBe(11);
		});

		it('should decrease the products quantity by 1', function(){
			var model = new Product({quantity: 10});
			spyOn(model, 'save');
			productView.model = model;

			productView.decrease();

			expect(model.get('quantity')).toBe(9);
		});

		it('should destroy the model when delete', function(){
			var model = new Product();
			spyOn(model, 'save');			
			spyOn(model, 'destroy');
			productView.model = model;

			productView.delete();

			expect(model.destroy).toHaveBeenCalled();
		});

		it('should add class editing when edit', function(){
			productView.edit();

			expect(productView.$el).toHaveClass('editing');
		});

		it('should not save when press a key diferent than Enter', function(){
			spyOn(productView, 'save').andCallThrough();
			productView.delegateEvents();

			var e = jQuery.Event("keypress");
			e.keyCode = 50; // # Some key code value

			productView.finishEdit(e);

			expect(productView.save).not.toHaveBeenCalled();
		});

		it('should save when press Enter', function(){
			spyOn(productView, 'save');
			productView.delegateEvents();

			var e = jQuery.Event("keypress");
			e.keyCode = 13; // # Enter key code value

			productView.finishEdit(e);

			expect(productView.save).toHaveBeenCalled();
		});

		it('should update title when it is diferent from the previous one', function(){
			var model = new Product({ title: 'old title', quantity: 1 });
			spyOn(model, 'save');
			
			productView.model = model;
						
			productView.$('input').val('new title');
			
			productView.save();

			expect(model.save).toHaveBeenCalled();
		});

		it('should not update title when it is equals the previous one', function(){
			var model = new Product({ title: 'old title', quantity: 1 });
			spyOn(model, 'save');

			productView.model = model;
			productView.$('input').val('old title');
			
			productView.save();

			expect(model.save).not.toHaveBeenCalled();
		});

		describe('Events', function(){

			it('should call the increase function when click on the increase button', function(){
				spyOn(productView, 'increase');
				productView.delegateEvents();

				productView.$('a.increase').click();

				expect(productView.increase).toHaveBeenCalled();
			});

			it('should call the decrease function when click on the decrease button', function(){
				spyOn(productView, 'decrease');
				productView.delegateEvents();

				productView.$('a.decrease').click();

				expect(productView.decrease).toHaveBeenCalled();
			});

			it('should call the delete function when click on the remove button', function(){
				spyOn(productView, 'delete');
				productView.delegateEvents();

				productView.$('a.remove').click();

				expect(productView.delete).toHaveBeenCalled();
			});

			it('should call the edit function when double click on the view', function(){
				spyOn(productView, 'edit');
				productView.delegateEvents();

				productView.$('.view').dblclick();

				expect(productView.edit).toHaveBeenCalled();				
			});

			it('should call the save function when focused out from the editing input', function(){
				spyOn(productView, 'save');
				productView.delegateEvents();

				productView.$('input').focusout();

				expect(productView.save).toHaveBeenCalled();				
			});

			it('should call the finishEdit when press a key in the editing input', function(){
				spyOn(productView, 'finishEdit');
				productView.delegateEvents();

				productView.$('input').keypress();

				expect(productView.finishEdit).toHaveBeenCalled();	
			});

		});

	});

});