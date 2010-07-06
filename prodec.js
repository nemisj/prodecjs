(typeof(Declare) == "undefined") && (function(){

    var hitch = function(scope, fnc) {
        return function protected() {
            return fnc.apply(scope, arguments);
        }
    }

    Declare = function dec() {
        
        var parent;
        var proto;
        var parentProto;

        if (arguments.length == 1) {
            // console.debug('Building new one');
            proto = arguments[0];
        } else if (arguments.length ==2) {
            // console.debug('Extending object');
            parent = arguments[0];
            proto  = arguments[1];
        } else {
            // console.debug('What is this for thing?');
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

        var constructor = function() {

            var members  = {}; 
            var proscope = {_value: 'hello'};
            
            for (var i in proto) {

                var fnc    = proto[i];
                var member = null;
                var isfnc  = false;
                
                if (typeof fnc == "function") {
                    isfnc = true;
                    with (proscope) {
                        member = eval("member = " + fnc.toString());
                        // console.debug('Member now is',member);
                    } 
                } else {
                    member = fnc; 
                }

                if (/^_|^\$/.test(i)) {
                    /// console.debug('Found protected member: ' + i);
                    // delete this[i]; not possible to delete proto-based member
                    this[i]     = null;
                    proscope[i] = isfnc ? hitch(this, member) : member;
                } else {
                    this[i] = member; 
                }
            }
        }

        constructor.prototype = proto;

        return constructor;
    }
})();
