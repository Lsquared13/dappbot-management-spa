/**
 * Given an error, use the following strategies to try and
 * extract a clean message:
 * 
 * 1. Check if the error has a `data` field, in which case
 * we were given the error by useResource. If it does:
 * 
 *   1. Try to get the `err.message` value from it,
 * as that is where our API places errors.  
 * 
 *   2. If that key isn't present, try getting `message`, as 
 * that's where API Gateway places it.
 * 
 * 2. If there's no `data` field, look for a `message`
 * field, the default location for JS errors.
 * 
 * 3. If nothing is there, return the input stringified so
 * there's always something.
 *    
 * @param err 
 */
export function getErrMsg(err:any):string {
  let { data, message } = err;
  if (data && data.err && data.err.message) {
    return data.err.message as string;
  } else if (data && data.message) {
    return data.message as string;
  } else if (message) {
    return message
  } else {
    return JSON.stringify(err)
  }
}

export function bodyHas(object:Object, propNames:string[]) {
  return propNames.every(propName => object.hasOwnProperty(propName))
}