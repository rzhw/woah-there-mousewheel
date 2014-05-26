var EditorView = require('atom').EditorView,
    origHandleEvents = EditorView.prototype.handleEvents;

module.exports = {
  activate: function(state) {
    EditorView.prototype.handleEvents = function() {
      if (!this.mini) {
        this.scrollView.on('mousewheel', (function(_this) {
          return function(e) {
            var delta = e.originalEvent.wheelDeltaY;
            if (delta != 0) {
              // Cancel out 0.7 of the original scroll change to make it delta * 0.3
              _this.scrollTop(_this.scrollTop() + delta * 0.7);
              return false;
            }
          };
        })(this));
      }
      origHandleEvents.call(this);
    };
  },
  deactivate: function() {
    EditorView.prototype.handleEvents = origHandleEvents;
  }
  // TODO: bind/unbind currently open editorviews
};
