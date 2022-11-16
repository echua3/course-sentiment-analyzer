/* 
 Handles undo downvote request
 Requires reviewID 
*/
function UndoDownvote(reviewID) {

    // console.log("UNDO DOWNVOTE URL: ", process.env.REACT_APP_API_ENDPOINT + "/review/undoDownvote/" + reviewID + "/" +  window.userID);

    const requestData = async () =>{
        const response = await fetch(process.env.REACT_APP_API_ENDPOINT + "/review/undoDownvote/" + reviewID + "/" + window.userID, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            }
        })
        .catch(error => {
            window.alert(error);
            return;
        });

        if(!response.ok) {
            console.log('!response.ok')
        } else {
            console.log(response)
        }
    }
    requestData();

}

export default UndoDownvote