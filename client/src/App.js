import './App.css';
import Main from './Main'
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import ProductForm from './components/ProductForm';
import AllProducts from './components/AllProducts';
import OneProduct from './components/OneProduct';
import EditProduct from './components/EditProduct';

function App() {
	return (
		<div className="App container py-3" style={{backgroundColor: "#F8F8F8"}}>
			<BrowserRouter>
				<Switch>
					<Route exact path="/">
					<h1 className='text-center'>All Products</h1>
						<ProductForm />
						<AllProducts />
					</Route>
					<Route exact path="/product/:id/display">
						<OneProduct />
					</Route>
					<Route exact path="/product/:id/edit">
						<EditProduct />
					</Route>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
