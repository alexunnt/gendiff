import _ from 'lodash';

const buildDifference = (firstObjectData, secondObjectData) => {
  const uniqueKeys = _.union(Object.keys(firstObjectData), Object.keys(secondObjectData));

  return uniqueKeys.reduce((acc, item) => {
    const firstObjectItem = firstObjectData[item];
    const secondObjectItem = secondObjectData[item];
    if (_.has(firstObjectData, item) && _.has(secondObjectData, item)) {
      const checkingFirstObject = _.isObject(firstObjectItem);
      const checkingSecondObject = _.isObject(secondObjectItem);
      if (checkingFirstObject && checkingSecondObject) {
        return [...acc, {
          type: 'object',
          key: item,
          children: buildDifference(firstObjectItem, secondObjectItem),
        }];
      }
      if (firstObjectItem === secondObjectItem) {
        return [...acc, {
          type: 'unchanged',
          key: item,
          value: firstObjectItem,
        }];
      }
      if (checkingFirstObject || checkingSecondObject) {
        return [...acc, {
          type: 'changed',
          key: item,
          firstValue: firstObjectItem,
          secondValue: secondObjectItem,
        }];
      }
      return [...acc, {
        type: 'changed',
        key: item,
        firstValue: firstObjectItem,
        secondValue: secondObjectItem,
      }];
    }
    if (_.has(firstObjectData, item)) {
      return [...acc, {
        type: 'deleted',
        key: item,
        value: firstObjectItem,
      }];
    }
    return [...acc, {
      type: 'added',
      key: item,
      value: secondObjectItem,
    }];
  }, []);
};

export default buildDifference;
