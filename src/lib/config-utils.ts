/**
 * Set Value of object from a path separated by . or passed delimiter
 * @param {Object}
 *      { object: Object, prop: String, delim: String, newVal }
 * @return {undefined}
 * **/
export const setNestedValue = ({
                          object,
                          prop,
                          newVal,
                          delim = `.`
                        }: { object: any, prop: string, newVal: any, delim: string }) => {
  if (!object || !prop) {
    return ``;
  }
  const segments = prop.split(delim);
  let currentLevel = object[segments[0]];
  if ((currentLevel || currentLevel === 0) && (typeof currentLevel !== `object` || segments.length === 1)) {
    object[segments[0]] = newVal;
  } else if (currentLevel && typeof currentLevel === `object`) {
    for (let i = 1; segments.length > i; ++i) {
      if (currentLevel) {
        if (i === segments.length - 1) {
          currentLevel[segments[i]] = newVal;
        }
        if (!currentLevel[segments[i]]) {
          currentLevel[segments[i]] = {};
        }
        currentLevel = currentLevel[segments[i]];
      }
    }
  } else {
    object[segments[0]] = newVal;
  }
};

/**
 * Get Value of object from a path separated by . or passed delimiter
 * @param {Object}
 *      { object: Object, prop: String, delim: String }
 *
 * @return {String}
 * **/
export const getNestedValue = ({ object, prop, delim = `.` }: { object: any, prop: string, delim: string }) => {
  let value = undefined;
  if (!object || !prop) {
    return value;
  }
  const segments = prop.split(delim);
  let currentLevel = object[segments[0]];
  if ((currentLevel || currentLevel === 0 || currentLevel === false) &&
    (typeof currentLevel !== `object` || segments.length === 1)) {
    value = currentLevel;
  } else if (currentLevel && typeof currentLevel === `object`) {
    for (let i = 1; segments.length > i; ++i) {
      if (currentLevel) {
        if (i === segments.length - 1 && value === undefined) {
          value = currentLevel[segments[i]];
        }
        currentLevel = currentLevel[segments[i]];
      }
    }
  }
  return value;
};
