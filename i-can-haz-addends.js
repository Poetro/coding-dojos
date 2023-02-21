module.exports = { doesItAddUp };

/**
 * Checks if N numbers in values add up to result.
 *
 * @param {number[]} values The values to search in.
 * @param {number} result The result to look for.
 * @param {number} [valuesToAddUp=2] The number of values to add up.
 * @returns {boolean} Some values add up to the required result.
 */
function doesItAddUp(values, result, valuesToAddUp = 2) {
  // Part of the API, validate inputs.
  if (typeof result !== "number" || Number.isNaN(result))
    throw new TypeError("The result must be a number");
  if (typeof valuesToAddUp !== "number" || Number.isNaN(valuesToAddUp))
    throw new TypeError("The valuesToAddUp must be a number");
  if (valuesToAddUp < 1)
    throw new RangeError("The valuesToAddUp need to be at least 1");

  // There are not enough values to add up, fail fast.
  if (values.length < valuesToAddUp) return false;

  return _doesItAddUpN(values, result, valuesToAddUp);
}

/**
 * Recursively checks if N numbers in values add up to result.
 *
 * @param {number[]} values The values to search in.
 * @param {number} result The result to look for.
 * @param {number} valuesToAddUp The number of values to add up.
 * @returns {boolean} Some values add up to the required result.
 */
function _doesItAddUpN(values, result, valuesToAddUp) {
  // It is a simple lookup if values to add up is less then 2.
  if (valuesToAddUp < 2) return values.includes(result);

  // Two values can be checked if they add up.
  if (valuesToAddUp === 2) return _doesItAddUp(values, result);

  /** Check the remaining combinations. */
  return values.some((value) =>
    _doesItAddUpN(values.slice(1), result - value, valuesToAddUp - 1)
  );
}

/**
 * Checks if two numbers in values add up to result.
 *
 * @param {number[]} values The values to search in.
 * @param {number} result The result to look for.
 * @returns {boolean} Some values add up to the required result.
 */
function _doesItAddUp(values, result) {
  /** @type {Record<number, boolean>} Tracks processed numbers. */
  const processedNumberMap = Object.create(null);

  // Search through the values if they add up.
  return values.some((value) => {
    /** @type {boolean} Check if the reduced result has been processed. */
    const doesAddUp = processedNumberMap[result - value];
    // Mark the value as processed.
    processedNumberMap[value] = true;
    return doesAddUp;
  });
}
