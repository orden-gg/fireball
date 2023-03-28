export const paramsToUrlString = (params: CustomAny): CustomAny => {
  let str = '';

  for (const key in params) {
    if (str !== '') {
      str += '&';
    }
    if (params[key] instanceof Array) {
      for (let i = 0; i < params[key].length; i++) {
        if (str !== '') {
          str += '&';
        }
        str += key + '=' + encodeURIComponent(params[key][i]);
      }
    } else {
      str += key + '=' + encodeURIComponent(params[key]);
    }
  }

  return str;
};
