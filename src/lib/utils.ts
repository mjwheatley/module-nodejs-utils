/** Makes deep copy of object with no references to any nested values.
 * @param {Object} object
 * @return {Object} copy
 **/
export const deepCopy = (object: any) => {
   return JSON.parse(JSON.stringify(object));
};


/**
 * delay()
 * Wraps setTimeout() in a Promise
 * @param {number} t timeout
 * @param {Function} v
 * @return {Promise}
 * **/
export const delay = (t: number, v: Function) => {
   return new Promise(function(resolve) {
      setTimeout(resolve.bind(null, v), t);
   });
};

/**
 * @param {String} stringTemplate
 * @param {Object} keyPairs
 * @return {String}
 * **/
export const interpolateString = (stringTemplate: string, keyPairs: any) => {
   return stringTemplate.replace(
      new RegExp(`\\$\{([^\{(.*?)\}]+)\}`, `g`),
      (_unused, key) => {
         return keyPairs[key];
      });
};

/**
 * Returns object to URL Encoded Query-String
 * @param {String} obj
 * @return {String} response
 * **/
export const urlEncodeObj = ({ obj }: {obj: any}) => {
   if (!obj) {
      return ``;
   }
   const str = [];
   for (const p in obj) {
      if (obj.hasOwnProperty(p)) {
         str.push(encodeURIComponent(p) + `=` + encodeURIComponent(obj[p]));
      }
   }
   return str.join(`&`);
};
