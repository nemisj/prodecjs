Super = Declare();

Super.prototype._value   = 'initial';
Super.prototype.getValue = function() {
    debug(this.id + ".getValue :" + _value);
    return _value;
}
Super.prototype.bla = function(){
    debug('Super.bla');
}


Sub = Declare( Super );

Sub.prototype._setValue = function(val) {
    debug(this.id + '._setValue: ' + val);
    _value = val;
}

Sub.prototype.setValue = function(val) {
    debug(this.id + ".setValue");
     _setValue( val );
}

Sub.prototype.getSuperValue = function() {
    debug(this.id + ".getSuperValue");
    return $super.getValue();
}

Sub.prototype.bla = function(){
    debug(this.id + ".bla");
    $super.bla();
}
