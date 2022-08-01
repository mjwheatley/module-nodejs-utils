const { expect } = require(`chai`);
const utils = require(`./modules/module-nodejs-utils/src/lib/config-utils`);

describe(`## config-utils.js unit tests`, () => {
   describe(`setNestedValue()`, () => {
      const testObject = {
         topLevelZero: 0,
         topLevelZeroString: `0`,
         grandParent: {
            parent1: {
               child: `Jeffery`,
               child2: `Paul`
            },
            parent2: `Hannah`
         },
         empty: ``
      };
      let object;
      beforeEach(() => {
         object = JSON.parse(JSON.stringify(testObject));
      });
      it(`undefined tests`, () => {
         expect(utils.setNestedValue({ object: testObject })).to.be.empty;
         expect(utils.setNestedValue({ prop: `no.object` })).to.be.empty;
      });
      it(`should set top level value`, () => {
         utils.setNestedValue({ object, prop: `topLevelZero`, newVal: 1 });
         expect(object.topLevelZero).to.be.equal(1);
      });
      it(`should set nested level value`, () => {
         utils.setNestedValue({ object, prop: `grandParent.parent2`, newVal: `Chris`, delim: `.` });
         expect(object.grandParent.parent2).to.be.equal(`Chris`);
      });
      it(`should set create new object and set value if not defined`, () => {
         utils.setNestedValue({ object, prop: `grandParent.parent3.child1`, newVal: `Craig` });
         expect(object.grandParent.parent3.child1).to.be.equal(`Craig`);
      });
      it(`should replace object`, () => {
         utils.setNestedValue({ object, prop: `grandParent.parent1`, newVal: `Peg` });
         expect(object.grandParent.parent1).to.be.equal(`Peg`);
         expect(object.grandParent.parent1.child).to.be.undefined;
         expect(object.grandParent.parent2.child).to.be.undefined;
      });
   });
   describe(`getNestedValue()`, () => {
      const testObject = {
         topLevelZero: 0,
         topLevelZeroString: `0`,
         grandParent: {
            parent1: {
               child: `Jeffery`,
               child2: `Paul`
            },
            parent2: `Hannah`
         },
         empty: ``
      };
      it(`undefined tests`, () => {
         expect(utils.getNestedValue({ object: testObject })).to.be.undefined;
         expect(utils.getNestedValue({})).to.be.undefined;
      });
      it(`should return value for the prop of passed object`, () => {
         expect(utils.getNestedValue({
            object: testObject,
            prop: `grandParent_parent1_child`,
            delim: `_`
         })).to.be.equal(`Jeffery`);
      });
      it(`should return undefined if prop does not exist`, () => {
         expect(utils.getNestedValue({ object: testObject, prop: `notThere` })).to.be.undefined;
      });
      it(`should return undefined if parent of nested prop does not exist`, () => {
         expect(utils.getNestedValue({ object: testObject, prop: `grandParent.notThere.deep` })).to.be.undefined;
      });
      it(`should return empty if property exists but is empty`, () => {
         expect(utils.getNestedValue({ object: testObject, prop: `empty` })).to.be.undefined;
      });
      it(`should return 0 if property is 0 number or string`, () => {
         expect(utils.getNestedValue({ object: testObject, prop: `topLevelZero` })).to.be.equal(0);
         expect(utils.getNestedValue({ object: testObject, prop: `topLevelZeroString` })).to.be.equal(`0`);
      });
   });
});
