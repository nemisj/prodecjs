Super = Declare();

Super.prototype._value   = 'initial';
Super.prototype.getValue = function() {
    debug(this.id + ".getValue :" + _value);
    return _value;
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
