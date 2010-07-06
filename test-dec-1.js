Super = Declare({
    _value    : 'initial',
    _setValue : function(val) {
        debug('Super._setValue: ' + val);
        if (val == 'test') {
            _value = 'done';
        }
    },
    setValue  : function(val) {
        debug('Super.setValue');
         _setValue( val );
    },
    getValue : function(){
        debug('Super.getValue: ' + _value);
        return _value;
    }
});

Sub = Declare( Super, {
    _setValue : function(){
        debug('Sub._setValue');
        _value = 'not-done';
    },
    getValue : function() {
        debug('Sub.getValue');
        return $getValue();    
    }
});
