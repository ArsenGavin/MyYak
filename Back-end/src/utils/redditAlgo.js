module.exports = {
  map: function () {
    function hot(ups, downs, date) {
      const score = ups - downs;
      const order = log10(Math.max(Math.abs(score), 1));
      const sign = score > 0 ? 1 : score < 0 ? -1 : 0;
      const seconds = epochSeconds(date) - 1134028003;
      const product = order + sign * seconds / 45000;

      return Math.round(product * 10000000) / 10000000;
    }

    function log10(val) {
      return Math.log(val) / Math.LN10;
    }

    function epochSeconds(d) {
      return (d.getTime() - new Date(1970, 1, 1).getTime()) / 1000;
    }

    return emit(hot(this.ups.length, this.downs.length, new Date(this.createdAt)), this)
  },

  reduce: function (k, vals) {
    return vals;
  },
}
