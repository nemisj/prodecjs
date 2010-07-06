var child = new Sub();

// public overriden function 
// with supercall
debug('\nOverride + supercall:');
 child.getValue();

// inherited function
// with protected overrriden function
debug('\nInherit + protect:');
child.setValue('test');

debug('\nValue test');
var newv = child.getValue();

// Testing protected method from outside
// Method should throw error
try {
    debug('\nProtected access');
    child._setValue( 'never' );
} catch(e) {
    debug("ERROR: " + e.message);
}
