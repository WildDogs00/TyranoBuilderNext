Builder.Window = {}, Builder.Window.Base = Builder.Core.Base.extend({
    defaults: {}, close: function () {
        this.j_window.remove()
    }
});