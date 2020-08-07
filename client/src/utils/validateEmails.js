const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
//?: 	Non-capturing group ex: A(?:nt|pple)	Apple(match), Ant(match), Anpple(false)
export default (emails) => {
  const invalidEmails = emails
    .split(",")
    .map((email) => email.trim()) // 這邊已經是個 a trim array
    .filter((email) => re.test(email) === false); //留下re.test === false 的 email, 若=false, re.test(email) === false 會retur true
  //filter 只會留下return true 的item
  //.map return a new array
  if (invalidEmails.length) {
    return `These emails are invalid: ${invalidEmails}`; //es6 syntax ${invalidEmails}, use `` to return template string
  }

  return; //return undefined
};
// re.test => regex match method
