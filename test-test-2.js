var a = new Sub();

a.id = 'SUB';

a.getValue();

a.setValue('HELLO');

a.getValue();

try {
    a._setValue();
} catch(e) {
    debug('ERROR when calling _protected :' + e.message);
}
