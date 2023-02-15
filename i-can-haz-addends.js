/**
 * Checks if two numbers in values add up to result.
 *
 * @param {number[]} values The values to search in.
 * @param {number} result The result to look for.
 * @returns {boolean} Some values add up to the required result.
 */
function doesItAddUp(values, result) {
  if (typeof result !== "number" || Number.isNaN(result))
    throw new TypeError("The result must be a number");

  /** @type {Record<number, boolean>} */
  const numberMap = Object.create(null);
  return values.some((value) => {
    const isAddUp = numberMap[result - value];
    numberMap[value] = true;
    return isAddUp;
  });
}

/**
 * Checks if N numbers in values add up to result.
 *
 * @param {number[]} values The values to search in.
 * @param {number} result The result to look for.
 * @param {number} valuesToAddUp The number of values to add up.
 * @returns {boolean} Some values add up to the required result.
 */
function doesItAddsUpN(values, result, valuesToAddUp) {
  if (typeof result !== "number" || Number.isNaN(result))
    throw new TypeError("The result must be a number");
  if (typeof valuesToAddUp !== "number" || Number.isNaN(valuesToAddUp))
    throw new TypeError("The items must be a number");
  if (valuesToAddUp < 1) {
    throw new RangeError("The items need to be at least 1");
  }
  // There are not enough items, fail fast.
  if (values.length < valuesToAddUp) return false;
  
  return _doesItAddUpN(values, result, valuesToAddUp);

  /**
   * Recursively checks if N numbers in values add up to result.
   *
   * @param {number[]} _values The values to search in.
   * @param {number} _result The result to look for.
   * @param {number} _valuesToAddUp The number of values to add up.
   * @returns {boolean} Some values add up to the required result.
   */
  function _doesItAddUpN(_values, _result, _valuesToAddUp) {
    // It is a simple lookup if values to add up is less then 2.
    if (_valuesToAddUp < 2) return values.includes(result);
    if (_valuesToAddUp === 2) {
      return doesItAddUp(_values, _result);
    }
    /** Check the remaining combinations. */
    return _values.some((value) =>
      _doesItAddUpN(
        _values.slice(1),
        _result - value,
        _valuesToAddUp - 1
      )
    );
  }
}

module.exports = { doesItAddUp, doesItAddsUpN };
