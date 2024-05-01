const responseHandler = require('../handlers/response.handler')
const tmdbApi = require('../tmdb/tmdb.api')

const personDetail = async (req, res)=>{
    try{
        const {personId} = req.params
        const person = await tmdbApi.personDetail({personId})
        responseHandler.ok(res, person)
    }catch{
        responseHandler.error(res)
    }
}

const personMedias = async (req, res)=>{
    try{
        const {personId} = req.params
        const media = await tmdbApi.personMedias({personId})
        responseHandler.ok(res, media)
    }catch{
        responseHandler.error(res)
    } 
}

module.exports = {
    personDetail,
    personMedias
}