# Coding Dojos

Set of katas for a coding dojo.

## [Diamond Kata](https://github.com/davidwhitney/CodeDojos/tree/master/Diamond%20Kata)

This kata is based on a post by Seb Rose here: http://claysnow.co.uk/recycling-tests-in-tdd/

### Problem

Given a character from the alphabet, print a diamond of its output with that character being the midpoint of the diamond.

### Examples

```javascript
console.log(diamond.create('A'))
/* output:
A
*/

console.log(diamond.create('B'))
/* output:
 A
B B
 A
*/
console.log(diamond.create('C'))
/* output:
  A
 B B
C   C
 B B
  A
*/
```

### API

```typescript
namespace Diamond {
  /**
   * Create a character 💎 starting from 🅰
   * until the supplied character.
   *
   * @param character The maximum character to use.
   * @returns The lines shaping the 💎.
   */
  interface create {
    (character: string): string
  }
}
```

## [I Can Haz Addends? ❓➕❓✅](https://github.com/robcthegeek/dojo-starter-facilitator/blob/main/problems/I-Can-Haz-Addends.md)

Given an input of a collection of numbers - `values` - and a number `result` - return whether any two numbers from the list add up to `result`.

Additional notes:

- `values` can contain zero or more items.
- `values` can have repeated numbers of the same value.

Additional task:

- Add option to add up `n` number of items instead of just two.

### Example

Given `[10, 15, 3, 7]` and `result` of `17`, return `true` since `10 + 7` is `17`.

### API

```typescript
namespace ICanHazAddends {
  /**
   * Checks if two numbers in values add up to result.
   *
   * @param values The values to search in.
   * @param result The result to look for.
   * @returns Some values add up to the required result.
   */
  interface doesItAddUp {
    (values: number[], result: number): boolean
  }
  /**
   * Checks if N numbers in values add up to result.
   *
   * @param values The values to search in.
   * @param result The result to look for.
   * @param valuesToAddUp The number of values to add up.
   * @returns Some values add up to the required result.
   */
  interface doesItAddsUpN {
    (values: number[], result: number, valuesToAddUp: number): boolean
  }
}
```
