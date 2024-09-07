export const saveToLocalStorage = (cart) => {
  //* Dışarıdan gönderile ürünü string'e çevirirp localStorage'a ekledik.
  localStorage.setItem("cart", JSON.stringify(cart));
};

//* localStorage da veri varsa getir yoksa boş dizi dönder
export const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("cart")) || [];
};

export const calculateCartTotal = (cart) => {
  /*
   * reduce: Diziyi tek bir değere indirgemek için kullanılır.
   * Birinci parametre olarak callback fonksiyon çağrılır. Bu fonksiyonun  parametresine her bir elemanın toplam maliyete eklenmesi için kullanılan matematiksel bir işlemdir.
   * ikinci parametre reduce fonksiyonun başlangıç değeridir.
   */

  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

export const updateCartIcon = (cart) => {
  const cartIcon = document.getElementById("cart-icon");
  const i = document.querySelector(".bx-shopping-bag");
  let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  i.setAttribute("data-quantity", totalQuantity);
};
