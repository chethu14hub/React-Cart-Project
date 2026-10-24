
import React, { useEffect } from 'react';
import './productList.css';

import image1 from './download (38).jpg';
import image2 from './T-shirt manipulation design.jpg';

function ProductList() {
    const products = [
        {
            image: image1,
            name: 'T-shirt',
            price: 100
        },
        {
            image: image2,
            name: 'Shirt',
            price: 200
        }
    ];

    useEffect(() => {
        const cards = document.querySelectorAll('.product-details');

        function updateSubtotal(card) {
            const priceText =
                card.querySelector('.product-price').innerText;

            const price = Number(
                priceText.replace('Price: ₹', '')
            );

            const quantity = Number(
                card.querySelector('.display').innerText
            );

            const subtotal = price * quantity;

            card.querySelector('.total').innerText = `₹${subtotal}`;
        }

        function increase(event) {
            const button = event.currentTarget;
            const card = button.closest('.product-details');
            const display = card.querySelector('.display');

            let quantity = Number(display.innerText);
            quantity++;

            display.innerText = quantity;
            updateSubtotal(card);
        }

        function decrease(event) {
            const button = event.currentTarget;
            const card = button.closest('.product-details');
            const display = card.querySelector('.display');

            let quantity = Number(display.innerText);

            if (quantity > 1) {
                quantity--;
                display.innerText = quantity;
                updateSubtotal(card);
            }
        }

        function buyProduct(event) {
            const button = event.currentTarget;
            const card = button.closest('.product-details');
            const message = card.querySelector('.message');

            message.innerText = 'Added successfully!';
        }

        function clearMessage(event) {
            const button = event.currentTarget;
            const card = button.closest('.product-details');

            card.querySelector('.message').innerText = '';
        }

        const plusButtons = document.querySelectorAll('.plus');
        const minusButtons = document.querySelectorAll('.Minus');
        const buyButtons = document.querySelectorAll('.buy-button');
        const clearButtons = document.querySelectorAll('.clr');

        // Calculate initial subtotals
        cards.forEach((card) => updateSubtotal(card));

        plusButtons.forEach((button) => {
            button.addEventListener('click', increase);
        });

        minusButtons.forEach((button) => {
            button.addEventListener('click', decrease);
        });

        buyButtons.forEach((button) => {
            button.addEventListener('click', buyProduct);
        });

        clearButtons.forEach((button) => {
            button.addEventListener('click', clearMessage);
        });

        // Remove listeners when the component unmounts
        return () => {
            plusButtons.forEach((button) => {
                button.removeEventListener('click', increase);
            });

            minusButtons.forEach((button) => {
                button.removeEventListener('click', decrease);
            });

            buyButtons.forEach((button) => {
                button.removeEventListener('click', buyProduct);
            });

            clearButtons.forEach((button) => {
                button.removeEventListener('click', clearMessage);
            });
        };
    }, []);

    return (
        <div className="shop-container">
            <header className="shop-header">
                <h1>My Store</h1>
                <p>Discover your everyday style.</p>
            </header>

            <div className="parent">
                {products.map((product) => (
                    <div className="child" key={product.name}>
                        <div className="product-image">
                            <img
                                src={product.image}
                                alt={product.name}
                            />
                        </div>

                        <div className="product-details">
                            <h2 className="product-name">
                                {product.name}
                            </h2>

                            <h3 className="product-price">
                                Price: ₹{product.price}
                            </h3>

                            <div className="product-actions">
                                <button className="buy-button">
                                    Buy Now
                                </button>

                                <button className="clr">
                                    Clear
                                </button>
                            </div>

                            <div className="quantity-section">
                                <span>Quantity</span>

                                <div className="increament">
                                    <button
                                        className="Minus"
                                        aria-label={`Decrease ${product.name} quantity`}
                                    >
                                        −
                                    </button>

                                    <span className="display">1</span>

                                    <button
                                        className="plus"
                                        aria-label={`Increase ${product.name} quantity`}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className="subtotal-row">
                                <span>Subtotal</span>
                                <strong className="total">
                                    ₹{product.price}
                                </strong>
                            </div>

                            <p className="message" aria-live="polite"></p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;
