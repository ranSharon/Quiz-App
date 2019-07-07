import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { App } from './App';

Enzyme.configure({ adapter: new Adapter() });

// @ts-ignore
const enzymeWrapper = shallow(<App {...App.props} />);

describe('components', () => {
    describe('App', () => {
        it('should render self and subcomponents', () => {

            expect(enzymeWrapper.find('div').hasClass('App')).toBe(true)

            // expect(enzymeWrapper.find('h1').text()).toBe('todos')

            // const todoInputProps = enzymeWrapper.find('TodoTextInput').props()
            // expect(todoInputProps.newTodo).toBe(true)
            // expect(todoInputProps.placeholder).toEqual('What needs to be done?')
        })

        // it('should call addTodo if length of text is greater than 0', () => {
        //     const { enzymeWrapper, props } = setup()
        //     const input = enzymeWrapper.find('TodoTextInput')
        //     input.props().onSave('')
        //     expect(props.addTodo.mock.calls.length).toBe(0)
        //     input.props().onSave('Use Redux')
        //     expect(props.addTodo.mock.calls.length).toBe(1)
        // })
    })
})