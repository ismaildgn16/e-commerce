import {
  calculateCartTotal,
  getCartFromLocalStorage,
  saveToLocalStorage,
  updateCartIcon,
} from "./utils.js";
export let cart = getCartFromLocalStorage();

export const addToCart = (event, products) => {
  //* Tıkladığımız ürünün id'sine dataset ile eriştik.
  const productID = parseInt(event.target.dataset.id);
  const product = products.find((product) => productID === product.id);

  //* Eğer tıkladığımız ürün bulunursa if bloğu içine gir
  if (product) {
    //* Tıkladığımız ürün önceden sepette varsa find metodu kullanarak buluruz.
    const existingItem = cart.find((item) => item.id === productID);

    //* Sepette bu üründen önceden varsa miktarını bir arttır
    if (existingItem) {
      existingItem.quantity++;
    } else {
      //* Sepete ilk defa ürün eklediğimiz için yeni eklenen ürünün miktarını obje içerisinde tanımladık.
      const cartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      };
      cart.push(cartItem);
    }

    //* localStorage'a veri ekle
    saveToLocalStorage(cart);
    //* Sepete eklenen ürünün a etiketinin içeriğini değiştirdik.
    event.target.textContent = "Added";
    updateCartIcon(cart);

    //* toplam miktarı günceller
    displayCartTotal();
  }
};

export const renderCartItems = () => {
  const cartItemsElement = document.getElementById("cartItems");
  cartItemsElement.innerHTML = cart
    .map(
      (item) => `<div class="cart-item">
              <img
                src="${item.image}"
                alt=""
              />
              <div class="cart-item-info">
                <h2 class="cart-item-title">${item.title}</h2>
                <input
                  type="number"
                  min="1"
                  value="${item.quantity}"
                  class="cart-item-quantity"
                  data-id="${item.id}"
                />
              </div>
              <h2>$${item.price}</h2>
              <button class="remove-from-cart" data-id="${item.id}">Remove</button>
            </div>`
    )
    .join("");

  const removeButtons = document.getElementsByClassName("remove-from-cart");

  for (let i = 0; i < removeButtons.length; i++) {
    const removeButton = removeButtons[i];
    removeButton.addEventListener("click", removeFromCart);
  }

  const quantityInputs = document.getElementsByClassName("cart-item-quantity");
  for (let i = 0; i < quantityInputs.length; i++) {
    const quantityInput = quantityInputs[i];
    quantityInput.addEventListener("change", changeQuantity);
  }
};

const removeFromCart = (event) => {
  const productID = Number(event.target.dataset.id);
  cart = cart.filter((item) => item.id !== productID);

  //* localStorage güncelledik.
  saveToLocalStorage(cart);

  //* sayfayı güncelledik.
  renderCartItems();
  //* toplam miktarı günceller
  displayCartTotal();

  updateCartIcon(cart);
};

//* inputtaki miktar değiştiğinde çalışır.
const changeQuantity = (event) => {
  const productID = Number(event.target.dataset.id);
  const quantity = Number(event.target.value);

  //* input'a girilen miktar 0'dan büyükse
  if (quantity > 0) {
    //* cart dizisi içerisinde güncellemek istediğimiz ürünü id'ye göre bulduk.
    const cartItem = cart.find((item) => item.id === productID);

    //* ürün bulunduysa
    if (cartItem) {
      //* Bulduğumuz ürünün miktarını input'a girilen miktarla değiştirdik.
      cartItem.quantity = quantity;

      //* localStorage'u güncelledik.
      saveToLocalStorage(cart);
      //* toplam fiyatı günceller
      displayCartTotal();

      updateCartIcon(cart);
    }
  }
};

export const displayCartTotal = () => {
  const cartTotalElement = document.getElementById("cartTotal");
  //* toplam miktarı aldık.
  const total = calculateCartTotal(cart);
  //* total etiketinin içerisine veriyi gönderdik.
  cartTotalElement.textContent = `Total:$${total.toFixed(2)}`;
};
