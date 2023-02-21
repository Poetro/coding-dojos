const assert = require("assert");
const { doesItAddUp } = require("../i-can-haz-addends");

describe("I can haz addends?", function () {
  describe("doesItAddUp", function () {
    it("should throw if result is invalid", function () {
      assert.throws(doesItAddUp.bind(null, []), {
        message: "The result must be a number",
      });
      assert.throws(doesItAddUp.bind(null, [], ""), {
        message: "The result must be a number",
      });
      assert.throws(doesItAddUp.bind(null, [], Number.NaN), {
        message: "The result must be a number",
      });
      assert.throws(doesItAddUp.bind(null, [], null), {
        message: "The result must be a number",
      });
    });

    it("should return false for empty array", function () {
      assert.equal(doesItAddUp([], 0), false);
    });

    it("should return false for single item array", function () {
      assert.equal(doesItAddUp([1], 1), false);
    });

    it("should return false if items do not add up", function () {
      assert.equal(doesItAddUp([1, 2], 4), false);
    });

    it("should return true if items add up", function () {
      assert.equal(doesItAddUp([1, 2], 3), true);
    });

    it("should return true if items add up to 17", function () {
      assert.equal(doesItAddUp([10, 15, 3, 7], 17), true);
    });

    it("should return true if items add up to 20", function () {
      assert.equal(doesItAddUp([10, 15, 3, 10], 20), true);
    });

    it("should return true if items add up to 0", function () {
      assert.equal(doesItAddUp([0, 1, 2, 0], 0), true);
    });
  });

  describe("doesItAddUp with N values", function () {
    it("should throw if result is invalid", function () {
      assert.throws(doesItAddUp.bind(null, []), {
        message: "The result must be a number",
      });
      assert.throws(doesItAddUp.bind(null, [], ""), {
        message: "The result must be a number",
      });
      assert.throws(doesItAddUp.bind(null, [], Number.NaN), {
        message: "The result must be a number",
      });
      assert.throws(doesItAddUp.bind(null, [], null), {
        message: "The result must be a number",
      });
    });

    it("should throw if valuesToAddUp is invalid", function () {
      assert.throws(doesItAddUp.bind(null, [], 0, ""), {
        message: "The valuesToAddUp must be a number",
      });
      assert.throws(doesItAddUp.bind(null, [], 0, Number.NaN), {
        message: "The valuesToAddUp must be a number",
      });
      assert.throws(doesItAddUp.bind(null, [], 0, null), {
        message: "The valuesToAddUp must be a number",
      });
      assert.throws(doesItAddUp.bind(null, [], 0, 0), {
        message: "The valuesToAddUp need to be at least 1",
      });
    });

    it("should return false for empty array", function () {
      assert.equal(doesItAddUp([], 0, 1), false);
    });

    it("should return true for valuesToAddUp of 1 if the array contains item", function () {
      assert.equal(doesItAddUp([1, 0], 0, 1), true);
    });

    it("should return true for valuesToAddUp of 1 if the array contains item", function () {
      assert.equal(doesItAddUp([1, 0], 0, 1), true);
    });

    it("should return false if 2 valuesToAddUp do not add up", function () {
      assert.equal(doesItAddUp([1, 2], 4, 2), false);
    });

    it("should return true if 2 valuesToAddUp add up", function () {
      assert.equal(doesItAddUp([1, 2], 3, 2), true);
    });

    it("should return true if 2 valuesToAddUp add up to 17", function () {
      assert.equal(doesItAddUp([10, 15, 3, 7], 17, 2), true);
    });

    it("should return true if 2 valuesToAddUp add up to 20", function () {
      assert.equal(doesItAddUp([10, 15, 3, 10], 20, 2), true);
    });

    it("should return true if 2 valuesToAddUp add up to 0", function () {
      assert.equal(doesItAddUp([0, 1, 2, 0], 0, 2), true);
    });

    const N = Array.from({ length: 5 }, (_, index) => index + 1);

    N.forEach((n) => {
      describe(`${n} values to add up`, function () {
        it("should return false if not enough items", function () {
          const zeros = Array.from({ length: n - 1 }, () => 0);

          assert.equal(doesItAddUp(zeros, 0, n), false);
        });

        it("should return true if all are 0", function () {
          const zeros = Array.from({ length: n * 2 }, () => 0);

          assert.equal(doesItAddUp(zeros, 0, n), true);
        });

        it("should return true if all are 1", function () {
          const ones = Array.from({ length: n * 2 }, () => 1);

          assert.equal(doesItAddUp(ones, n, n), true);
        });

        it("should return false if all are 1 but searching for 0", function () {
          const ones = Array.from({ length: n * 2 }, () => 1);

          assert.equal(doesItAddUp(ones, 0, n), false);
        });

        it("should return true for exponents of 2", function () {
          const exponents = Array.from(
            { length: n * 2 },
            (_, index) => index * 2
          );

          assert.equal(doesItAddUp(exponents, 1 << n, n), true);
        });

        it("should return false for exponents of 2 when searching odd", function () {
          const exponents = Array.from(
            { length: n * 2 },
            (_, index) => index * 2
          );

          assert.equal(doesItAddUp(exponents, 1 + (1 << n), n), false);
        });
      });
    });
  });
});
