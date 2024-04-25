import {useState} from 'react'
import Popup from 'reactjs-popup'
import CartContext from '../../context/CartContext'
import './index.css'

// for (let i = 0; cartList.length; i += 1) {
//   total += cartList[i].price * cartList[i].quantity
// }

const CartSummary = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')
  const [updatepayment, setpayment] = useState(false)

  const handlePaymentMethodChange = event => {
    setSelectedPaymentMethod(event.target.value)
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        let total = 0
        cartList.forEach(items => {
          total += items.price * items.quantity
        })

        const checkPayment = () => {
          if (selectedPaymentMethod !== '') {
            setpayment(true)
          }
        }

        return (
          <div className="totalOrdervalue">
            <h1 className="orderPara">
              Order Total: <span className="span">Rs {total}/-</span>
            </h1>
            <p>items in cart : {cartList.length}</p>
            <div className="popup-container">
              <Popup
                modal
                trigger={
                  <button className="checkout-button" type="button">
                    Checkout
                  </button>
                }
              >
                {close => (
                  <>
                    <div className="modal">
                      {!updatepayment && (
                        <>
                          <h1 className="header">Checkout</h1>
                          <h3>Order Summary</h3>
                          <hr />
                          <p>items in cart : {cartList.length}</p>
                          <h4 className="orderPara paraColor">
                            Order Total:{' '}
                            <span className="span paraColor">Rs {total}/-</span>
                          </h4>
                          <hr />
                          <div>
                            <p>Select Payment Method:</p>
                            <div>
                              <input
                                type="radio"
                                id="card"
                                value="card"
                                checked={selectedPaymentMethod === 'card'}
                                onChange={handlePaymentMethodChange}
                              />
                              <label htmlFor="card" className="content">
                                Card
                              </label>
                            </div>
                            <div>
                              <input
                                type="radio"
                                id="netBanking"
                                value="netBanking"
                                checked={selectedPaymentMethod === 'netBanking'}
                                onChange={handlePaymentMethodChange}
                              />
                              <label htmlFor="netBanking" className="content">
                                Net Banking
                              </label>
                            </div>
                            <div>
                              <input
                                type="radio"
                                id="upi"
                                value="upi"
                                checked={selectedPaymentMethod === 'upi'}
                                onChange={handlePaymentMethodChange}
                              />
                              <label htmlFor="upi" className="content">
                                UPI
                              </label>
                            </div>
                            <div>
                              <input
                                type="radio"
                                id="wallet"
                                value="wallet"
                                checked={selectedPaymentMethod === 'wallet'}
                                onChange={handlePaymentMethodChange}
                              />
                              <label htmlFor="wallet" className="content">
                                Wallet
                              </label>
                            </div>
                            <div>
                              <input
                                type="radio"
                                id="cashOnDelivery"
                                value="cashOnDelivery"
                                checked={
                                  selectedPaymentMethod === 'cashOnDelivery'
                                }
                                onChange={handlePaymentMethodChange}
                              />
                              <label
                                htmlFor="cashOnDelivery"
                                className="content"
                              >
                                Cash on Delivery
                              </label>
                            </div>

                            {selectedPaymentMethod && (
                              <p>You selected: {selectedPaymentMethod}</p>
                            )}
                          </div>
                          <div className="buttonLayout">
                            <Popup
                              trigger={
                                <button
                                  type="button"
                                  className="button"
                                  onClick={checkPayment}
                                >
                                  Confirm Order
                                </button>
                              }
                              nested
                            >
                              <span className="para">
                                Your order has been placed successfully
                              </span>
                            </Popup>
                            <button
                              type="button"
                              className="button"
                              onClick={() => close()}
                            >
                              Close
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </>
                )}
              </Popup>
            </div>
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}
export default CartSummary
