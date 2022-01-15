import axios from "axios"
import { backend } from "../endPoints"

// let apis = []
// newQuestion.tags.forEach(tag => {
//     apis = [...apis, axios.get(backend + "tag/" + tag)]
// });
// axios
//     .all(apis)
//     .then(axios.spread((...responses) => {
//         let tmpTags = []
//         responses.forEach((response, idx) => {
//             tmpTags = [...tmpTags, response.data.name]
//         })
//         setTags(tmpTags)
//     }))

export const getSearch = (query) => {
    // let apix = [
    //     axios.get(`${backend}article?slug=${query}`),
    //     axios.get(`${backend}article?slug=${query}`),
    //     axios.get(`${backend}article?slug=${query}`)
    // ]
    axios
        .get(`${backend}tag?slug=${query}`)
        .then(res => {
            if (res.data.data.length > 0) {
                axios
                    .get(`${backend}article?tags=${res.data.data[0]._id}`)
                .then(res => {
                    console.log(res.data)
                })
                .catch((e) => {
                    console.log(e)
                })
            }
        })
}