const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

/* Account Reducer func */
export default function accountReducerV1(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      //LATER
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    case "account/convertCurrencyLoader":
      return { ...state, isLoading: true };

    default:
      return { ...state };
  }
}

export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  //.....Middleware
  return async function (dispatch, getState) {
    //API call
    dispatch({ type: "account/convertCurrencyLoader" });
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const convertedCurrency = data.rates.USD;

    //return action
    dispatch({ type: "account/deposit", payload: convertedCurrency });
  };
}
export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
export function requestLoan(loanAmount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount: loanAmount, purpose: purpose },
  };
}
export function payLoan() {
  return { type: "account/payLoan" };
}
