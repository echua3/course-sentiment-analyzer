/* 
 Handles downvote request
 Requires reviewID and userID
*/
function Downvote(reviewID, userID) {

    console.log("URL: ", process.env.REACT_APP_API_ENDPOINT + "/review/downvote/" + reviewID + "/" +  userID);

    const requestData = async () =>{
        const response = await fetch(process.env.REACT_APP_API_ENDPOINT + "/review/downvote/" + reviewID + "/" + userID, {
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

export default Downvote