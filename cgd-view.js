define([], function() {

  var View = function(model) {
    this.model = model;
  };

  View.prototype.draw = function(canvas) {
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (i = 0; i < this.model.people.length; i++) {
      var person = this.model.people[i];

      if (person.infected) {
        context.fillStyle = 'rgba(255, 0, 0, 64)';
      } else {
        context.fillStyle = 'rgba(0, 255, 0, 64)';
      }

      context.fillRect(person.x - 2, person.y - 2, 4, 4);
    }
  };

  return View;
});