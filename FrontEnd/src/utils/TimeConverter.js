export const getOffsetTimeString = (epoch) =>{
    let offset = Math.floor(new Date().getTime() / 1000) - epoch
    let hrs = Math.floor(offset / 3600)
    let mins = Math.floor((offset - hrs * 3600)/60)
    let secs = Math.floor(offset - hrs * 3600 - mins * 60)
    let re = ""
    console.log(offset,hrs, mins, secs)
    if (hrs >= 48){
        re = new Date(epoch * 1000).toLocaleString('en-us', { day: 'numeric', month: 'short' })
    }
    else if (hrs >= 24) re = "Yesterday"
    else if (hrs > 0) re = `${hrs} hours ago`
    else if (mins > 0) re = `${mins} mins ago`
    else re = `${secs} seconds ago`
    return re
}