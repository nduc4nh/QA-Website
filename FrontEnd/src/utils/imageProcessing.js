import { dataURLtoFile } from "./StringProcessing"

export const convertBs64toBlob = (bs64) => {
    try {
        return URL.createObjectURL(dataURLtoFile(bs64))
    }
    catch {
        return null
    }
}

export const storeImage = (bs64) => {
    localStorage.setItem("image", bs64)
}

export const getImage = () => {
    let res = localStorage.getItem("image")
    return res
}

export const removeImage = () =>{
    localStorage.removeItem("image")
}