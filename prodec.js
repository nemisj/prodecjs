(typeof(Declare) == "undefined") && (function(){

    var hitch = function(scope, fnc) {
        return function protected() {
            return fnc.apply(scope, arguments);
        }
    }

	var getConstructor = function(){

		var s = function constr() {

			// in  IE constr != s
			// using s

			// instead of this.constructor.prototype
			// this should be used
			// cause if object is created like this
			// var A = function(){}
			// A.prototype = {}
			// prototype of the constructor will be empty
			var proto = s.prototype;

			var proscope = {};
			
			for (var i in proto) {

				var member = proto[i];
				var isfnc  = (typeof member == "function");
				
				if (isfnc) {
					with (proscope) {
						member = eval("member = " + member.toString());
						// console.debug('Member now is',member);
					} 
				}

				if (/^_|^\$/.test(i)) {
					/// console.debug('Found protected member: ' + i);
					// delete this[i]; not possible to delete proto-based member
					if (i in this) { this[i] = null; }
					proscope[i] = isfnc ? hitch(this, member) : member;
				} else {
					this[i] = member; 
				}
			}
		}

		return s;
	}

    Declare = function dec() {
        
        var parent;
        var proto;
        var parentProto;

        if (arguments.length == 1) {
            // console.debug('Building new one');
            proto = arguments[0];
			if (typeof proto == "function") {
				// superclass
				parent = proto;
				proto  = {};
			} 
        } else if (arguments.length ==2) {
            // console.debug('Extending object');
            parent = arguments[0];
            proto  = arguments[1];
        } else {
			return getConstructor();
        }

        if (parent) {
            // building inheritance chain
            parentProto = parent.prototype;
            for (var i in parentProto) {
                if (!(i in proto)) {
                    proto[i] = parentProto[i];
                } else {
                    proto["$" + i] = parentProto[i];
                }
            }
        }

		var constructor = getConstructor();
        constructor.prototype = proto;
		constructor.prototype.constructor = constructor;

        return constructor;
    }
})();
