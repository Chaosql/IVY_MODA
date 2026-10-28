/** Logic kiểm tra thông tin giao hàng dùng chung cho CheckoutSection và unit test. */
export interface ShippingInfo {
  name: string;
  phone: string;
  street: string;
  province: string;
  customProvince: string;
}

export type ValidationResult = 'required' | 'name' | 'phone' | 'province' | null;

const NAME_REGEX = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂÂÊÔƠƯưăâêôơưẠ-ỹ\s]{2,50}$/;
const PHONE_REGEX = /^(0|\+84)(3[2-9]|5[2689]|7[06789]|8[1-9]|9[0-9])[0-9]{7}$/;

export function validateShipping(info: ShippingInfo): ValidationResult {
  if (!info.name || !info.phone || !info.street || !info.province) {
    return 'required';
  }
  if (!NAME_REGEX.test(info.name.trim())) {
    return 'name';
  }
  if (!PHONE_REGEX.test(info.phone.trim())) {
    return 'phone';
  }
  if (info.province === 'Khác' && !info.customProvince.trim()) {
    return 'province';
  }
  return null;
}
