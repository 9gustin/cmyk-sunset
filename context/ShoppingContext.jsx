import React, { createContext, useContext, useEffect } from 'react';
import { DataContext } from './DataContext';

export const ShoppingContext = React.createContext('');

const orderDataBase = {
	userName: null,
	totalAmount: 0,
	itemsCount: 0,
	orderStatus: 'Pending',
	payMethod: null,
	payId: null,
	payStatus: 'Pending',
	deliveryMethod: null,
	deliveryAdress: null,
	delivered: null,
	finished: false,
	createdAt: null,
	updatedAt: null,
	items: [],
};

export const ShoppingProvider = ({ children }) => {
	const [orderData, setOrderData] = React.useState(orderDataBase);
	const { data } = useContext(DataContext);

	const setCart = user => {
		if (user) {
			const order = orderData;
			order.userName = user.name;
			order.createdAt = Date.now();
			order.updatedAt = Date.now();
			localStorage.setItem('cart', JSON.stringify(order));
			setOrderData(order);
			return order;
		}
	};

	const getCart = () => {
		const cart = JSON.parse(localStorage.getItem('cart'));
		return cart;
	};

	const itemsCount = () => orderData?.items?.length || 0;

	const totalItemCart = () => {
		let total = 0;
		console.log(orderData.items);
		orderData.items.map(item => {
			total += item.total;
		});
		return total;
	};

	const addItemCart = newItem => {
		const cart = JSON.parse(localStorage.getItem('cart'));
		const cursor = cart.items.findIndex(item =>
			item.idMarvel == newItem.idMarvel ? true : false
		);
		if (cursor == -1) {
			cart.items.push(newItem);
		} else {
			cart.items[cursor].quantity += newItem.quantity;
			cart.items[cursor].total = cart.items[cursor].quantity * newItem.price;
		}
		cart.totalAmount = totalItemCart(cart);
		localStorage.setItem('cart', JSON.stringify(cart));
		setOrderData(cart);
		return cart;
	};

	const removeItemCart = idMarvel => {
		const cart = JSON.parse(localStorage.getItem('cart'));
		const cursor = cart.items.findIndex(item =>
			item.idMarvel == idMarvel ? true : false
		);
		if (cursor == -1) {
			throw '404 id not found';
		} else {
			cart.items.splice(cursor, 1);
			cart.totalAmount = totalItemCart(cart);
			localStorage.setItem('cart', JSON.stringify(cart));
			setOrderData(cart);
			return true;
		}
	};

	const setPayDelivery = payDeli => {
		const cart = JSON.parse(localStorage.getItem('cart'));
		cart.payMethod = payDeli.payMethod;
		cart.payId = payDeli.payMethod;
		cart.payStatus = payDeli.payMethod;
		cart.deliveryMethod = payDeli.payMethod;
		cart.deliveryAdress = payDeli.payMethod;
		localStorage.setItem('cart', JSON.stringify(cart));
		setOrderData(cart);

		return order;
	};

	const checkout = async () => {
		const cart = JSON.parse(localStorage.getItem('cart'));
		cart.orderStatus = 'finished';
		cart.finished = true;

		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(cart),
		};
		const response = await fetch('/api/orders', requestOptions);
		const resData = await response.json();
		return resData;
	};

	useEffect(() => {
		if (!getCart() && data) setCart(data);
	}, [data]);

	useEffect(() => {
		setOrderData(getCart());
	}, []);

	return (
		<ShoppingContext.Provider
			value={{
				setCart,
				orderData,
				addItemCart,
				itemsCount,
				removeItemCart,
				setPayDelivery,
				checkout,
			}}>
			{children}
		</ShoppingContext.Provider>
	);
};
