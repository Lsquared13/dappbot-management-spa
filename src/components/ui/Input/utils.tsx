import validate from 'validator';



export const isValidUrl = (newVal:string)=>{
    return validate.isURL(newVal) && newVal.indexOf('https://') === 0
}
export const isValidWeb3Url = (newVal:string)=>{
    return validate.isURL(newVal) && newVal.indexOf('https://') === 0
}

export const isValidABI = (newVal: string) => {
    return validate.isJSON(unescapePotentialJSONString(newVal));
}

const unescapePotentialJSONString = (jsonString: string) => {
    // Strips beginning and ending quotes if they exist
    // Taken from: https://stackoverflow.com/questions/19156148/i-want-to-remove-double-quotes-from-a-string
    return jsonString.replace(/^"(.+(?="$))"$/, '$1')
                     // Remove escape slashes
                     .replace(/\\"/g, '"');
}

export const isValidAddress = (newVal:string) => {
    return /^0x[a-fA-F0-9]+$/.test(newVal) && newVal.length === 42;
}

export const cleanAddress = (newVal:string) => {
    let prefix = newVal.slice(0,2);
    let hasPrefix = ['0x','0X'].includes(prefix);
    let val = hasPrefix ? newVal.slice(2) : newVal;
    let cleaned =  val.replace(/[^a-fA-f0-9]/g, '');
    return hasPrefix ? prefix + cleaned : cleaned;
}

export const cleanDappName = (val:string) => {
    return val.toLowerCase()
      .replace(/\s/g, '-') // Convert spaces to hyphens
      .replace(/[^A-Za-z0-9-]/g, '') // Remove non-alphanumerics
}

export const isValidDappName = (val:string) => {
    return val.charAt(0) !== '-' && val.charAt(val.length - 1) !== '-'
}