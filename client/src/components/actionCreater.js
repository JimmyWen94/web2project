export const FOLLOW = "FOLLOW";
export const UNFOLLOW = "UNFOLLOW";
export const GET_FRIENDS = "GETFRIENDS";
export const GET_USERS = "GETUSERS";

function handleFriends(data) {
    return {
        type: GET_FRIENDS,
        data
    }
}

function handleFollow(data) {
    return {
        type: FOLLOW,
        data
    };
}

function handleUnfollow(id) {
    return {
        type: UNFOLLOW,
        id
    };
}

function handleUsers(data) {
    return {
        type: GET_USERS,
        data
    }
}

export function getUsers() {
    return dispatch => {
        return fetch("http://localhost:3001/api/users/")
            .then(res => res.json())
            .then(data => dispatch(handleUsers(data)))
            .catch(err => dispatch(err));
    }
}

export function getFriends() {
    return dispatch => {
        return fetch("http://localhost:3001/api/users/1a2cbe1c-20d1-409c-9e09-bccaaf2d995d")
            .then(res => 
                res.json())
            .then(data => 
                //console.log(data);
                //console.log(dispatch(handleFriends(data.friends)));
                dispatch(handleFriends(data.friends))
            )
            .catch(err => dispatch(err));
    }
}

export function followFriend(friendId) { // friends must be like : {friendId: "b5382893-0538-4523-b416-eab78d27e5ee"}
    return dispatch => {
        return fetch("http://localhost:3001/api/users/1a2cbe1c-20d1-409c-9e09-bccaaf2d995d/addFriend", {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify({ friendId })
        })
            .then(res => res.json())
            .then(data => dispatch(handleFollow(data)))
            .catch(err => dispatch(err));
    };
}

export function unfollowFriend(friendId) {
    return dispatch => {
        return fetch(`http://localhost:3001/api/users/1a2cbe1c-20d1-409c-9e09-bccaaf2d995d/unfriend/${friendId}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => dispatch(handleUnfollow(friendId)))
            .catch(err => dispatch(err));
    };
}
