var sub = new Sub();

sub.id = 'SUB';

// testing direct inheritance
sub.getValue();

//testing protected call
sub.setValue('HELLO');

// checking inherited protected values
sub.getValue();

// testing super call
sub.getSuperValue();

// testing override
sub.bla();

try {
    sub._setValue();
} catch(e) {
    debug('ERROR when calling _protected :' + e.message);
}
