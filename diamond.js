/** @type {number} The character code of 🅰 */
const CHAR_CODE_A = "A".charCodeAt(0);

module.exports = { create, CHAR_CODE_A };

/**
 * Create a character 💎 starting from 🅰 until the supplied character.
 *
 * @param {string} character The maximum character to use.
 * @returns {string} The lines shaping the 💎.
 */
function create(character) {
  /** @type {string} */
  const type = typeof character;
  // This is part of the API, validate the input.
  if (type !== "string")
    throw new TypeError(
      `Invalid type ('${type}') supplied instead of 'string'`
    );
  if (!character || character.length > 1)
    throw new RangeError(
      `The supplied string is too ${character ? "long" : "short"}`
    );

  /** @type {number} The character code of the supplied character */
  const charCode = character.charCodeAt(0);
  if (charCode < CHAR_CODE_A)
    throw new RangeError("The supplied character must be at least 'A'");

  /** @type {string[]} The lines making up the result. */
  let lines = [];
  /** Go until we reach the target (excluding) starting from 🅰 */
  for (let code = CHAR_CODE_A; code <= charCode; code++) {
    lines.push(getLine(code, charCode));
  }
  /** Repeat the lines in reverse order starting from before the last */
  return lines.concat(lines.slice(0, -1).reverse()).join("\n");
}

/**
 * Get a line of the 💎.
 *
 * @param {number} charCode The code of the character
 * @param {number} maxCharCode The maximum code of the characters
 * @returns {string} A line of the 💎.
 */
function getLine(charCode, maxCharCode) {
  /** @type {string} The character in this line */
  const character = String.fromCharCode(charCode);
  /** @type {number} The offset of the maximum characters code from 🅰. */
  const offset = maxCharCode - CHAR_CODE_A;
  if (charCode === CHAR_CODE_A) {
    /** @type {string} This spaces around the 🅰. */
    const spaces = getSpaces(offset);
    return spaces + character + spaces;
  } else {
    /** @type {number} The number of spaces around the current characters. */
    const around = maxCharCode - charCode;
    /** @type {number} The number of spaces between the current characters. */
    const between = (offset - around) * 2 - 1;
    /** @type {string} The spaces around the characters. */
    const spaceAround = getSpaces(around);
    return (
      spaceAround + character + getSpaces(between) + character + spaceAround
    );
  }
}

/**
 * Generate a string of spaces.
 *
 * @param {number} length
 */
function getSpaces(length) {
  return " ".repeat(length);
}
