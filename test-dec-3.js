Super = Declare();

Super.prototype.public = function() {
    _protected();
}

Super.prototype._protected = function() {
    debug("1. Congratulations this was the first test");
}
