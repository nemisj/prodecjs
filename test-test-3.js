var kid = new Super();

kid.public();

try {
    kid._protected();
} catch(e) {
    debug('2. Try also another "declarations" by clicking one of the above buttons.');
}
