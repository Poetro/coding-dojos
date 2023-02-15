const assert = require("assert");
const { create, CHAR_CODE_A } = require("../diamond");

describe("diamond", function () {
  it("should throw for invalid", function () {
    assert.throws(create.bind(null, null), {
      message: "Invalid type ('object') supplied instead of 'string'",
    });
    assert.throws(create.bind(null), {
      message: "Invalid type ('undefined') supplied instead of 'string'",
    });
    assert.throws(create.bind(null, ""), {
      message: "The supplied string is too short",
    });
    assert.throws(create.bind(null, "AA"), {
      message: "The supplied string is too long",
    });
    assert.throws(create.bind(null, " "), {
      message: "The supplied character must be at least 'A'",
    });
  });

  it("should create an A diamond", function () {
    assert.equal(create("A"), "A");
  });

  it("should create a B diamond", function () {
    assert.equal(create("B"), " A \nB B\n A ");
  });

  it("should create a C diamond", function () {
    assert.equal(create("C"), "  A  \n B B \nC   C\n B B \n  A  ");
  });

  const UPPERCASE_LETTERS = Array.from({ length: 26 }, (_, index) =>
    String.fromCharCode(CHAR_CODE_A + index)
  );

  UPPERCASE_LETTERS.forEach((letter) => {
    describe(`validate ${letter}`, () => {
      /** @type {string} The generated 💎. */
      const diamond = create(letter);
      /** @type {string[]} The list of lines. */
      const lines = diamond.split("\n");
      /** @type {number} The index of the middle line including it. */
      const middleIndexInclusive = Math.ceil(lines.length / 2);
      /** @type {number} The index of the line before the middle. */
      const middleIndexExclusive = Math.floor(lines.length / 2);

      it("should start with A", function () {
        assert.equal(lines.length > 0, true);
        assert.equal(lines[0].trim(), "A");
      });

      it("should end with A", function () {
        assert.equal(lines.length > 0, true);
        assert.equal(lines[lines.length - 1].trim(), "A");
      });

      it("should be symmetric on the Y axis", function () {
        assert.equal(lines.length > 0, true);
        const firstHalf = lines.slice(0, middleIndexInclusive);
        const secondHalf = lines.slice(middleIndexExclusive);
        assert.deepEqual(secondHalf.reverse(), firstHalf);
      });

      it("should be symmetric on the X axis", function () {
        assert.equal(lines.length > 0, true);
        const firstHalf = lines.map((line) =>
          line.slice(0, Math.ceil(line.length / 2))
        );
        const secondHalf = lines.map((line) =>
          line
            .slice(Math.floor(line.length / 2))
            .split("")
            .reverse()
            .join("")
        );
        assert.deepEqual(secondHalf, firstHalf);
      });

      it(`should have ${letter} at the edges of the middle`, function () {
        const middleLine = lines[middleIndexExclusive];
        assert.equal(middleLine[0], letter);
        assert.equal(middleLine[middleLine.length - 1], letter);
      });

      it(`should have spaces in front of each line`, function () {
        lines.slice(0, middleIndexExclusive).forEach((line, index) => {
          const around = middleIndexExclusive - index;
          assert.equal(line.slice(0, around), " ".repeat(around));
        });
      });
    });
  });
});
