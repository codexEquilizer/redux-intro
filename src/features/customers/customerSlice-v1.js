const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

/* Customer Reducer func */
export default function customerReducerV1(
  state = initialStateCustomer,
  action
) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };

    case "customer/updateName":
      return { ...state, fullName: action.payload.fullName };

    default:
      return { ...state };
  }
}

export function createCustomer(fullName, nationalID) {
  console.log(fullName, nationalID);
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}

export function updateName(fullName) {
  return { type: "customer/updateName", payload: fullName };
}
