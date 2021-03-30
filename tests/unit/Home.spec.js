import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Home from '@/components/Home.vue'

const localVue = createLocalVue() // a scoped Vue constructor that we can make 
// changes to without affecting the global Vue constructor
localVue.use(Vuex) // tell vue to use vuex

let wrapper;

describe('Home.vue Test', () => {
    let actions
    let store
    let mutations
  
    beforeEach(() => {
        /*actions = {
            actionClick: jest.fn(),
            actionInput: jest.fn()
        }*/
        mutations = {
            clearAll: jest.fn()
        }
        // mock the store
        store = new Vuex.Store({
            actions,
            mutations
        })

        // render the component
        wrapper = shallowMount(Home, {
            store,
            localVue,
            propsData: {
                title: 'Home'
            },
        })
    })

    it('renders title and buttons when component is created', () => {

        // check the name of the component
        // expect(wrapper.name()).toMatch('Home')
        expect(wrapper.is(Home)).toBe(true)
        //expect(wrapper.attributes().id).toBe('home')
        //expect(wrapper.text()).toContain('Hotspotify')

        expect(wrapper.find('h1').text()).toContain('Hotspotify')
        //expect(wrapper.find({ ref: 'login-button' })).toBe(true)
        expect(wrapper.find('#login-button').exists()).toBe(true)
        expect(wrapper.find('#sample-button').exists()).toBe(true)
        //expect(wrapper.find('#sample-button').element.id).toBe('sample-button')
        // check that the title is rendered
        //expect(wrapper.text()).toMatch('Home')
    })

    it('clears the user information upon navigation to this component', () => {
        expect(mutations.clearAll.mock.calls).toHaveLength(1)
    })
})