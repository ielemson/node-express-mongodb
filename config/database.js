if(process.env.NODE_ENV){
module.exports = {mongURI:'mongodb+srv://videojot:videojot1@video-jot-cluster-8hzaj.mongodb.net/test?retryWrites=true'}
}else{
module.exports = {mongURI:'mongodb://localhost/video_idea_DB'}
}