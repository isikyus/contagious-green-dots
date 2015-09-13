define([
  'cgd-model',
  'cgd-view'
], function(CgdModel, CgdView) {
  return function(targetCanvas) {

    var model = new CgdModel(targetCanvas.width, targetCanvas.height);
    var view = new CgdView(model, targetCanvas);


    model.populate(100);

    // Create a "patient zero" for our infection.
    model.people[0].infected = true;

    view.draw(targetCanvas);

    setInterval(function() {
      model.update();
      view.draw(targetCanvas);
    }, 40);
  };
});