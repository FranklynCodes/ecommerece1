import Commerce from "@chec/commerce.js";

// Creating a new instance of the Commerce library and storing it in commerce
// true = create new store 
export const commerce = new Commerce(process.env.REACT_APP_COMMERCEJS_SANDBOX_PUBLIC_KEY, true);