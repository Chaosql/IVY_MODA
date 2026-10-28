const vietnamMobilePhoneRegex = /^(0|\+84)(3[2-9]|5[2689]|7[06789]|8[1-9]|9[0-9])[0-9]{7}$/;

export function isValidVietnamMobilePhone(phone: string): boolean {
  return vietnamMobilePhoneRegex.test(phone);
}
