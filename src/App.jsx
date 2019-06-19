//@ts-check
import React, { Component, Fragment } from 'react';
import { Provider, Consumer } from './context/context';
import { number, text, increment, decrement, setValue } from './context/reducers';

class AppProvider extends Component {
	state = {
		number: 10,
		text: '',
		guardarContext: (nombre, fn, value) =>
			this.setState((state) => ({ [nombre]: value !== undefined ? value : fn(state[nombre]) }))
	};

	render() {
		console.log(this.state.text);
		return <Provider value={this.state}>{this.props.children}</Provider>;
	}
}
const Green = () => (
	<div>
		<h1>Green</h1>
		<Consumer>
			{(context) => (
				<Fragment>
					{context.number}
					<br />
					<br />
					{
						<input
							type="text"
							placeholder={text}
							value={context.nombre}
							onChange={({ target: { value } }) => context.guardarContext(text, setValue, value)}
						/>
					}
				</Fragment>
			)}
		</Consumer>
	</div>
);
const Blue = () => (
	<div>
		<h1>Blue</h1>
		<Consumer>
			{(context) => (
				<Fragment>
					<button onClick={() => context.guardarContext(number, increment)}>+</button>
					<button onClick={() => context.guardarContext(number, decrement)}>-</button>
				</Fragment>
			)}
		</Consumer>
		<Green />
	</div>
);

class Red extends Component {
	render() {
		return (
			<AppProvider>
				<div>
					<h1>Red</h1>
					<Consumer>{(context) => context.number}</Consumer>
					<Blue />
				</div>
			</AppProvider>
		);
	}
}

export default Red;
