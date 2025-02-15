Builder.Param = {}, Builder.Param.Base = Builder.Core.Base.extend({
    defaults: {}, checkVital: function (r) {
        this.get("param").vital && (null == r || "" == r ? this.showError() : this.hideError())
    }, showError: function () {
        this.j_param.parents("td").css("background-color", "#F08080")
    }, hideError: function () {
        this.j_param.parents("td").css("background-color", "")
    }, valid: function () {
        var r = this.get("param_name"), a = this.get("param").validate || {}, e = $(".param-content [name=" + r + "]");
        return e.parent().find(".error").remove(), !!e.valid(a)
    }, close: function () {
        this.j_view.remove()
    }
});