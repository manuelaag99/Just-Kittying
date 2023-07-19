export default function filterArrayByUniqueByKey(array, key) {
    const uniqueValues = {};
    return array.filter(obj => {
      if (!uniqueValues[obj[key]]) {
        uniqueValues[obj[key]] = true;
        return true;
      }
      return false;
    });
  }