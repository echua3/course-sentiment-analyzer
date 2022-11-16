/* 
 Handles undo upvote request
 Requires reviewID
*/
function UndoUpvote(reviewID) {

    // console.log("UNDO UPVOTE URL: ", process.env.REACT_APP_API_ENDPOINT + "/review/undoUpvote/" + reviewID + "/" +  window.userID);

    const requestData = async () =>{
        const response = await fetch(process.env.REACT_APP_API_ENDPOINT + "/review/undoUpvote/" + reviewID + "/" + window.userID, {
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

export default UndoUpvote