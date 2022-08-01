const { expect } = require(`chai`);
const utils = require(`./modules/module-nodejs-utils/src/lib/utils`);

describe(`## utils.js unit tests`, function() {
   describe(`deepCopy()`, function() {
      it(`should deeply copy an object`, function() {
         const object = {
            hello: `world`,
            nested: {
               foo: `bar`
            }
         };
         const deepCopy = utils.deepCopy({ object });
         expect(deepCopy).to.not.equal(object);
         expect(object.nested).to.not.equal(deepCopy.nested);

         const shallowCopy = { ...object };
         expect(shallowCopy).to.not.equal(object);
         expect(object.nested).to.equal(shallowCopy.nested);
      });
   });

   describe(`delay()`, () => {
      it(`should based on amount of time passed`, (done) => {
         const startTime = (new Date()).getTime();
         utils.delay(1000).then(() => {
            const finishTime = (new Date()).getTime();
            const delay = finishTime - startTime;
            expect(delay).at.least(1000);
            expect(delay).below(2000);
            done();
         }).catch(done);
      });
   });

   describe(`interpolateString()`, function() {
      it(`should replace \${variables} inside a string`, function() {
         const stringTemplate = `My first name is \${firstName}. My last name is \${lastName}.`;
         const data = {
            firstName: `Matt`,
            lastName: `Wheatley`
         };
         const content = utils.interpolateString(stringTemplate, data);
         expect(content).to.equal(`My first name is Matt. My last name is Wheatley.`);
      });
   });

   describe(`urlEncodeObj()`, () => {
      it(`should return empty if object empty or undefined`, () => {
         // eslint-disable-next-line prefer-const
         let obj;
         expect(utils.urlEncodeObj({ obj })).to.be.empty;
         obj = {};
         expect(utils.urlEncodeObj({ obj })).to.be.empty;
      });
      it(`should encode object`, () => {
         const obj = {
            foo: `bar`,
            foo1: `bar2`
         };
         expect(utils.urlEncodeObj({ obj })).to.be.equal(`foo=bar&foo1=bar2`);
      });
   });
});
