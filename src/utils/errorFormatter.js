export function formatError(err){
  if (!err.errors) return err.errorMsg || "Unknown error";
  let errMsg = "";
  for (const key in err.errors) {
    if (Object.hasOwnProperty.call(err.errors, key)) {
      const messages = err.errors[key];
      messages.forEach(msg => {
        errMsg += `ValidationError: ${msg}\n`;
      });
    }
  }

  return errMsg.trim();
}