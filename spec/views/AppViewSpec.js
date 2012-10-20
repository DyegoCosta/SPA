define(['views/AppView', 'collections/ProductsList'], function(AppView, ProductsList){

	var appView;

	describe('App view', function(){
		
		beforeEach(function(){			
			appView = new AppView();	 		

	 		appView.render();
		});

		it('has template', function(){
			expect(appView.template).toBeDefined();
		});

		it('when click on the add-product button call add function', function(){
			spyOn(appView, 'add').andCallThrough();
			appView.delegateEvents();

			appView.$("a#add-product").click();
					
			expect(appView.add).toHaveBeenCalled();
		});

		/*it('after add a product it should reset the form', function(){
			spyOn(appView, 'add').andCallFake(function(obj){ obj.trigger('add'); });
			spyOn(appView, 'reset');
			appView.delegateEvents();

			appView.add();

			expect(appView.reset).toHaveBeenCalled();
		});*/

		it('the inputs should be empty after reset the form', function(){
			appView.$("#quantity").val(10);
			appView.$("#title").val("some title");

			appView.reset();
			
			expect(appView.$("#quantity").val()).toBe("0");
			expect(appView.$("#title").val()).toBe("");
		});
	});

});