export default function userReducer(state = {}, action) {
    switch (action.type) {
        case "TEST":
            return {
                name: "Lenny",
                age: 37
            };
        default:
            return state;
    }
}
