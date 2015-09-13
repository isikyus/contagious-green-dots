define([], function() {

  var Model = function(width, height) {
    this.width = width;
    this.height = height;
    this.people = [];
    this.speed = 0.5;
  };

  var randomPoint = function(width, height) {
    var x = Math.random() * width;
    var y = Math.random() * width;
    return { 'x': x, 'y': y};
  }

  Model.prototype.populate = function(population) {
    var i;
    for (i = 0; i < population; i++) {
      var person = randomPoint(this.width, this.height);
      person.infected = false;
      this.people.push(person);
    }
  };

  Model.prototype.move = function(person, xDelta, yDelta) {
    person.x += xDelta;
    person.y += yDelta;

    // Wrap around if we hit the edges.
    person.x = (person.x + this.width) % this.width;
    person.y = (person.y + this.height) % this.height;
  };

  Model.prototype.checkForInfection = function(person) {
    // Naive O(n^2) algorithm, but good enough for small populations.

    // Only bother checking if we have an infection to spread.
    if (person.infected) {
      var infectionRange = 20;
      var i = 0;
      for (i = 0; i < this.people.length; i++) {
        var otherPerson = this.people[i];

        // Skip ourselves, and any other zombies.
        if(!otherPerson.infected) {
          var xDist = Math.abs(person.x - otherPerson.x);
          var yDist = Math.abs(person.y - otherPerson.y);

          if (xDist < infectionRange && yDist < infectionRange) {
            otherPerson.infected = true;
          };
        }
      }
    }
  };

  Model.prototype.update = function() {
    for(i = 0; i < this.people.length; i++) {
      var person = this.people[i];

      // Pick a random direction (NE, SE, NW, or SW)
      var xDelta = -(Math.sign(Math.random() - 0.5) * this.speed);
      var yDelta = -(Math.sign(Math.random() - 0.5) * this.speed);
      this.move(person, xDelta, yDelta);

      this.checkForInfection(person);
    }
  };

  Model.prototype.people = function() {
    return people;
  };

  return Model;
});