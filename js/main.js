const products = {
  crazy: {
    name: 'crazy',
    amount: 0,
    price: 31000,
  },
  light: {
    name: 'light',
    amount: 0,
    price: 26000,
  },
  cheeseburger: {
    name: 'cheeseburger',
    amount: 0,
    price: 29000,
  },
  dburger: {
    name: 'dburger',
    amount: 0,
    price: 24000,
  },
}
function summ(){return this.amount * this.price}
for(const key in products){
  products[key]['summ'] = summ
}
const cardList = document.querySelectorAll('.card')
const arrProducts = []
const cartBtnOpen = document.querySelector('.cart-btn')
const cartBtnClose = document.querySelector('.cart-dropdown__close')
const cartDropdown = document.querySelector('.cart-dropdown')
const cartDropdownContent = document.querySelector('.cart-dropdown__content')
const cartDropdownPrice = document.querySelector('.cart-dropdown__price')
cardList.forEach(function(card, cardKey){
  const cardBtn = card.querySelector('.card-btn')
  const cardId = card.getAttribute('id')
  const cardAmount = card.querySelector('.card-content__amount')
  const cardCount = card.querySelector('.card-count')
  const countItemAmount = card.querySelector('.count-item__amount')
  const cardSymbol = card.querySelectorAll('.symbol-btn')
  products[cardId]['srcImg'] = card.querySelector('.card-img').src
  
  cardBtn.addEventListener('click', function(event){
    event.preventDefault()
    let totalSumm = 0
    cardBtn.classList.add('active')
    cardAmount.classList.add('active')
    cardCount.classList.add('active')
    products[cardId].amount++
    arrProducts.push(products[cardId])
    cardAmount.innerHTML = products[cardId].amount
    countItemAmount.innerHTML = products[cardId].amount
    cartDropdownContent.innerHTML = ''
    arrProducts.forEach(function(obj, keyObj){
      const item = cartItemTemplate(obj)
      cartDropdownContent.append(item)
      totalSumm += obj.summ()
      cartDropdownPrice.innerHTML = totalSumm
    })
  })
  cardSymbol.forEach(function(btn, key){
    btn.addEventListener('click', function(event){
      event.preventDefault()
      let totalSumm = 0
      const symbol = btn.innerHTML
      if(symbol == '+' && products[cardId].amount <= 9){
        products[cardId].amount++
      }else if(symbol == '-' && products[cardId].amount > 0){
        products[cardId].amount--
      }
      cartDropdownContent.innerHTML = ''
      arrProducts.forEach(function(obj, keyObj){
        const item = cartItemTemplate(obj)
        cartDropdownContent.append(item)
        totalSumm += obj.summ()
        cartDropdownPrice.innerHTML = totalSumm
      })
      cardAmount.innerHTML = products[cardId].amount
      countItemAmount.innerHTML = products[cardId].amount
      const cartItemList = document.querySelectorAll('.cart-item')
      if(products[cardId].amount == 0){
        cardBtn.classList.remove('active')
        cardAmount.classList.remove('active')
        cardCount.classList.remove('active')
        arrProducts.forEach(function(item, key){
          if(item.amount == 0){
            arrProducts.splice(key, 1)
          }
        })
        cartItemList.forEach(function(el, key){
          const idEl = el.getAttribute('id')
          if(idEl == cardId){
            el.remove()
          }
        })
      }
      console.log(arrProducts);
    })
  })
})
cartBtnOpen.addEventListener('click', function(event){
  event.preventDefault()
  cartDropdown.style.display = 'flex'
  cartDropdown.style.transition = '0.5s'
  setTimeout(function(){
    cartDropdown.style.transform = 'translateY(0%)'
  },200)
  setTimeout(function(){
    cartDropdown.style.opacity = '1'
  },500)
})
cartBtnClose.addEventListener('click', function(event){
  event.preventDefault()
  cartDropdown.style.opacity = '0'
  setTimeout(function(){
    cartDropdown.style.transform = 'translateY(-150%)'
  },200)
  setTimeout(function(){
    cartDropdown.style.display = 'none'
  },500)
  setTimeout(function(){
    cartDropdown.removeAttribute('style')
  },600)
})
function cartItemTemplate({name,amount,price,srcImg}){
  const cartItem = document.createElement('div')
  cartItem.classList.add('cart-item')
  cartItem.setAttribute('id', name)
  const img = document.createElement('img')
  img.classList.add('cart-item__img')
  img.src = srcImg
  const cartContent = document.createElement('div')
  cartContent.classList.add('cart-item__content')
  const cartText = document.createElement('div')
  cartText.classList.add('cart-item__text')
  const cartCount = document.createElement('div')
  cartCount.classList.add('cart-item__count', 'count-item')
  
  const h5 = document.createElement('h5')
  h5.innerHTML = name
  const p = document.createElement('p')
  p.innerHTML = `${price} сум`
  
  const btnPlus = document.createElement('button')
  btnPlus.classList.add('cart-item__symbol','symbol-btn')
  btnPlus.innerHTML = '+'
  const btnMinus = document.createElement('button')
  btnMinus.classList.add('cart-item__symbol','symbol-btn')
  btnMinus.innerHTML = '-'
  const count = document.createElement('span')
  count.classList.add('cart-item__amount','count-item__amount')
  count.innerHTML = amount
  
  cartCount.append(btnMinus,count,btnPlus)
  cartText.append(h5,p)
  cartContent.append(cartText,cartCount)
  cartItem.append(img,cartContent)
  return cartItem
}
// управление карточками в корзинке
document.addEventListener('click', function(event){
  if(event.target.classList.contains('cart-item__symbol')){
    let totalSumm = 0
    const btn = event.target
    const parent = btn.closest('.cart-item')
    const parentId = parent.getAttribute('id')
    const symbol = btn.innerHTML
    const cartAmount = parent.querySelector('.cart-item__amount ')
    if(symbol == '+' && products[parentId].amount <= 9){
      products[parentId].amount++
    }else if(symbol == '-' && products[parentId].amount > 0){
      products[parentId].amount--
    }
    cartAmount.innerHTML = products[parentId].amount
    cardList.forEach(function(card,keyCard){
      const cardId = card.getAttribute('id')
      const cardAmount = card.querySelector('.card-content__amount')
      const cardCount = card.querySelector('.card-count')
      const countItemAmount = card.querySelector('.count-item__amount')
      const cardBtn = card.querySelector('.card-btn')
      if(parentId == cardId){
        cardAmount.innerHTML = products[parentId].amount
        countItemAmount.innerHTML = products[parentId].amount
        if(products[parentId].amount == 0){
          cardCount.classList.remove('active')
          cardAmount.classList.remove('active')
          cardBtn.classList.remove('active')
          parent.remove()
          cartDropdownPrice.innerHTML = 0
          arrProducts.forEach(function(item, key){
            if(item.amount == 0){
              arrProducts.splice(key, 1)
            }
          })
        }
      }
    })
    arrProducts.forEach(function(obj, keyObj){
      totalSumm += obj.summ()
      cartDropdownPrice.innerHTML = totalSumm
    })
    
  }
})