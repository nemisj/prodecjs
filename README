## Basic usage

Prodecjs adds ability to add protected scope to your classes.

	var A = Declare({
		public     : function() {
			// calling protected function
			_protected();
		},
		_protected : function() {
			alert( 'Protected called' );
		}
	});

Prodecjs can be used as the constructor replacer for creating protected scope in JavaScript.

	var A = Declare();
	A.prototype._protected = function() {
		alert (' Protected called');
	}

	A.prototype.public = function() {
		_protected();
	}


## Inheritance

Inherited functions can be called by using $super object and the function name. All inherited functions are making deal out of the protected scope. As example : 

	var A = Declare({
		public     : function() {},
		_protected : function() {}
	});

	var B = Declare(A, {
		test : function() {
			// calling public inherited function
			$super.public();

			// calling protected inherited function
			$super._protected();
		}
	});

## Limitations : 

Prodecjs has number of limitations. You should be aware of them before will start asking question "Why this is not working?"

* First of all inheritance is not possible via old school style. Meaning that inheritance always should be done with help of Decalre.

	Bad way : 

		function A(){}

		function B(){}
		B.prototype = new A();

	Good way : 

		var B = Declare(A,{});

* Second limitation concerns the runtime instances when new prototype member is added. If you add member to the prototype of the class it will be unavailable in all created instances. 
This limitation also can be seen as a good point, no one will be able to hijack the instantiated objects.

* Third limitation does not allow to access scope which was available at the moment of the prototype member creation. Take a look at example :

	var watch() {
		alert('B.bork is called');
	}

	B.prototype.bork = function() {
		watch();
	}

Such situation is not possible, despite the fact that the scope with *watch* function were available at the moment of creation.


