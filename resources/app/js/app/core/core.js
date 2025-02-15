Builder.Core = {}, function () {
    Builder.Core.Base = {};
    var t = Builder.Core.Base = function (t, e) {
        var i;
        t || (t = {}), (i = this.defaults) && (t = _.extend({}, i, t)), this.attributes = {}, this.cid = _.uniqueId("c"), this.attributes = t, this._escapedAttributes = {}, this.initialize.apply(this, arguments)
    };
    _.extend(t.prototype, {
        initialize: function () {
        }, get: function (t) {
            return this.attributes[t]
        }, escape: function (t) {
            var e;
            if (e = this._escapedAttributes[t]) return e;
            var i = this.get(t);
            return this._escapedAttributes[t] = _.escape(null == i ? "" : "" + i)
        }, has: function (t) {
            return null != this.get(t)
        }, set: function (t, e, i) {
            var r, n, s;
            for (n in _.isObject(t) || null == t ? (r = t, i = e) : (r = {})[t] = e, i || (i = {}), r) s = r[n], this.attributes[n] = s
        }
    });
    var e = function () {
    };
    t.extend = function (t, i) {
        var r = function (t, i, r) {
            var n;
            return n = i && i.hasOwnProperty("constructor") ? i.constructor : function () {
                t.apply(this, arguments)
            }, _.extend(n, t), e.prototype = t.prototype, n.prototype = new e, i && _.extend(n.prototype, i), r && _.extend(n, r), n.prototype.constructor = n, n.__super__ = t.prototype, n
        }(this, t, i);
        return r.extend = this.extend, r
    }
}();