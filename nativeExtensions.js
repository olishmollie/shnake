Number.prototype.times = function(f) {
  for (var i = 0; i < this; i++) {
    f();
  }
  return this;
}

Number.prototype.between = function(a, b) {
  var min = Math.min(a, b);
  var max = Math.max(a, b);

  return this > min && this < max;
}