import validate from 'validator';



export const isValidUrl = (newVal:string)=>{
    return validate.isURL(newVal) && newVal.indexOf('https://') === 0
}
export const isValidWeb3Url = (newVal:string)=>{
    return validate.isURL(newVal) && newVal.indexOf('https://') === 0
}

export const isValidABI = (newVal: string) => {
    return validate.isJSON(newVal)
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