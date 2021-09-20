const { databaseConnection } = require('./connection')

async function commentaryCreate(commentaryData) {
    const insertCommentary = {
        movie_title: commentaryData.movietitleValue,
        user_name: commentaryData.usernameValue,
        user_rate: commentaryData.userrateValue,
        commentary: commentaryData.commentaryValue
    }
    
    const result = await databaseConnection('tcmdb.commentaries').insert(insertCommentary)
    console.log(result)
    if(result){
        return{
            ...commentaryData,
            id: result[0]
        }
    } else{
        console.error("Error!")
    }
}

async function commentaryReadID(id) {
    const result = await databaseConnection('tcmdb.commentaries').where({ id })

    return result[0]
}

async function commentaryReadMovieTitle(movieTitle) {
    const result = await databaseConnection('tcmdb.commentaries').where({ movie_title: movieTitle })

    return result
}

async function commentaryDelete(id) {
    const result = await databaseConnection('tcmdb.commentaries').where({ id }).del()

    return result[0]
}

async function commentaryUpdate(id, commentaryData) {
    const updateCommentary = {
        movie_title: commentaryData.movietitleValue,
        user_name: commentaryData.usernameValue,
        user_rate: commentaryData.userrateValue,
        commentary: commentaryData.commentaryValue
    }

    const result = await databaseConnection('tcmdb.commentaries').where({ id }).update(updateCommentary)

    if(result){
        return {
            ...updateCommentary,
            id
        }
    } else {
        console.error("Error!")
    }

}

module.exports = { commentaryCreate, commentaryReadID, commentaryReadMovieTitle, commentaryDelete, commentaryUpdate }