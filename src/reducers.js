export default function reducer(state = {}, action) {
    if (action.type === "RECEIVE_USERS") {
        state = {
            ...state,
            friendsWannabes: action.friendsWannabes
        };
        console.log("state from reducer: ", state);
    }

    if (action.type === "ACCEPT_FRIEND") {
        state = {
            ...state,
            friendsWannabes: state.friendsWannabes.map(user => {
                if (user.id != action.recipient_id) {
                    return user;
                } else {
                    return {
                        ...user,
                        accepted: true
                    };
                }
            })
        };
        console.log("state from accept friend reducer: ", state);
    }

    if (action.type === "UNFRIEND") {
        state = {
            ...state,
            friendsWannabes: state.friendsWannabes.filter(user => {
                if (user.id != action.recipient_id) {
                    return user;
                } else {
                    return user.id !== action.recipient_id;
                }
            })
        };
    }

    return state;
}

// immutably - array
// map - good for changing item(s) in an array
// concat - combine two or more arays into one array
// filter - remove an item(s) from an array
// ... - clone array or objects
// Object.assign - make copy of objects
