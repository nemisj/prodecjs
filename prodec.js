(typeof(Declare) == "undefined") && (function(){

    var hitch = function(scope, fnc) {
        return function protected() {
            return fnc.apply(scope, arguments);
        }
    }

	var getConstructor = function(){

		var s = function() {

			// in  IE constr != s
			// using s

			// instead of this.constructor.prototype
			// this should be used
			// cause if object is created like this
			// var A = function(){}
			// A.prototype = {}
			// prototype of the constructor will be empty
			var proto = s.prototype;

			var prosup = {};

			var proscope = {
				$super : prosup
			};

			var member;
			
			for (var i in proto) {

				member = proto[i];
				var isfnc  = (typeof member == "function");
				
				if (isfnc) {
					with (proscope) {
						member = eval("member = " + member.toString());
						// console.debug('Member now is',member);
					} 
				}

				if (/^_/.test(i)) {
					/// console.debug('Found protected member: ' + i);
					// delete this[i]; not possible to delete proto-based member
					if (i in this) { this[i] = null; }
					proscope[i] = isfnc ? hitch(this, member) : member;
				} else {
					this[i] = member; 
				}
			}

            var $super;

            if ('__proto__' in proto) {
                $super = proto.__proto__;
            } else {
                $super = s.__super__ ? s.__super__.prototype : null;
            }

			if ($super) {
				for(var i in $super) {
					var smember = $super[i];
					var isfnc   = typeof (smember == "function");
					if (i in proto && proto[i] == smember ) {
						//' The same function, just do reassign'
						prosup[i] = (i in proscope) ? proscope[i] : ( isfnc ? hitch(this, this[i]) : this[i]);
					} else if (isfnc) {
						// Overridden, do creation
						with (proscope) {
							smember= eval("smember = " + smember.toString());
							// console.debug('Member now is',member);
						} 
						prosup[i] = hitch(this, smember);
					}
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

		var constructor = getConstructor();

		constructor.prototype.constructor = constructor;
        constructor.prototype = proto;

        // lets' support __proto__ facility 
        if (parent) {
            if ("__proto__" in constructor.prototype) {
                // we can do simple __proto__
                // browser will do stuff for us
                constructor.prototype.__proto__ = parent.prototype;
            } else {
                // IE case, maybe OPERA?
                // building own prototype
                parentProto = parent.prototype;

                for (var i in parentProto) {
                    if (!(i in proto)) {
                        proto[i] = parentProto[i];
                    }
                }

                constructor.__super__ = parent;
            }
        }

        return constructor;
    }
})();
