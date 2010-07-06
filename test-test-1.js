var child = new Sub();
// First public methods
// result should be "setted"

var old = child.getValue();

child.setValue('test');

var newv = child.getValue();

// Testing protected method from outside
// Method should throw error
try {
    child._setValue( 'never' );
} catch(e) {
    debug("ERROR: " + e.message);
}
