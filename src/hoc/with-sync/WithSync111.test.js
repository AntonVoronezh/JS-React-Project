import React from 'react';
import { mount, shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { WithSync } from './WithSync';
import dal from '../../helpers/libs/dal';

const mountWithProvider = children => store => mount(<Provider store={store}>{children}</Provider>);

jest.mock('../../helpers/libs/dal', () => {
	class DAL {
		setSync = () => jest.fn();
		startSync = () => jest.fn();
	}

	return new DAL();
});

class App extends React.Component {
	componentDidMount() {
		this.func();
	}

	componentDidUpdate(prevProps) {
		this.func();
	}

	func() {}

	funcAr = () => {};

	render() {
		return <div>gg</div>;
	}
}
class Wrap extends React.Component {
	func() {}

	render() {
		return this.props.children;
	}
}
class Wrap2 extends React.Component {
	func() {}

	render() {
		return this.props.children;
	}
}
let wrapperForSnapshot
beforeAll(() => {
	 wrapperForSnapshot = shallow(<App />);
	
});

afterEach(() => {
	jest.clearAllMocks();

});


describe('HOC <WithSync />', () => {
	
	// it('should not return an error', () => {
	// 	expect(wrapperForSnapshot).toMatchSnapshot();
	// });

	it('вызов метода ES5', () => {
		let spy = jest.spyOn(App.prototype, 'func');
		let wrapper = mount(<App />);
		// expect(wrapper.instance()).toBeInstanceOf(App)

		wrapper.instance().func();
		expect(spy).toBeCalledTimes(1);
	});

	it('вызов метода ES6', () => {
		let wrapper = mount(
			<Wrap2>
				<Wrap>
					<App />
				</Wrap>
			</Wrap2>
		);

		let app = wrapper.find(App);
		let spy = jest.spyOn(app.instance(), 'funcAr');
		app.update();
		app.instance().funcAr();
		expect(spy).toBeCalledTimes(1);
	});

	it('поиск во вложенностях с вызовом метода', () => {
		let spy = jest.spyOn(App.prototype, 'func');
		let wrapper = mount(
			<Wrap>
				<App />
			</Wrap>
		);
		let app = wrapper.find(App);

		app.instance().func();
		expect(spy).toBeCalledTimes(1);
	});

	it('componentDidMount', () => {
		let spy = jest.spyOn(App.prototype, 'func');
		// let spy2 = jest.spyOn(App.prototype, 'componentDidMount');
		let wrapper = mount(
			<Wrap>
				<App />
			</Wrap>
		);
		App.prototype.componentDidMount();
		expect(spy).toBeCalledTimes(1);
	});

	it('componentDidUpdate', () => {
		let spy = jest.spyOn(App.prototype, 'func');
		let wrapper = mount(
			<Wrap2>
				<Wrap>
					<App />
				</Wrap>
			</Wrap2>
		);

		App.prototype.componentDidUpdate();
		expect(spy).toBeCalledTimes(1);
	});
});
