// ES6 style export
export function fromReadableAmount(amount, decimals) {
    return ethers.utils.parseUnits(amount.toString(), decimals);
  }
  
  export function toReadableAmount(rawAmount, decimals) {
    return ethers.utils
      .formatUnits(rawAmount, decimals)
      .slice(0, READABLE_FORM_LEN);
  }
  