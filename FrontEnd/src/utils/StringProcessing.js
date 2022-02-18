export const truncate = (string, limit= 180) => {
    let re = string.length >= limit ? string.slice(0, limit) + "..." : string
    return [re, string.length >= limit]
}

export const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

const atob = str => Buffer.from(str,"base64").toString('binary')

export const dataURLtoFile = (dataurl, filename) =>{
 
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new File([u8arr], filename, {type:mime});
}

export const checkSlang = (str, SLANG) =>{
    for (let ele of str.split(" ")){
        for (let slg of SLANG){
            if (ele.trim() === slg.trim()) return true
        }
    }
    return false
}