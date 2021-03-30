import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import TopArtists from '@/components/TopArtists.vue'
import LoadingAnimation from '@/components/FireAnimation.vue';

const localVue = createLocalVue() // a scoped Vue constructor that we can make 
// changes to without affecting the global Vue constructor
localVue.use(Vuex) // tell vue to use vuex
localVue.use(VueRouter) // tell vue to use vue router

const router = new VueRouter();
let wrapper;

describe('TopArtists.vue Test', () => {
    let actions
    let store
    let mutations

    //TopArtists.getTopArtists2 = jest.fn();
    let getTopArtists2
  
    beforeEach(() => {
        getTopArtists2 = jest.spyOn(TopArtists.methods, "getTopArtists2")
        /*actions = {
            actionClick: jest.fn(),
            actionInput: jest.fn()
        }*/
        mutations = {
            setTopArtists: jest.fn(),
            setTimePeriod: jest.fn()
        }
        // mock the store
        store = new Vuex.Store({
            actions,
            mutations
        })

        // render the component
        wrapper = shallowMount(TopArtists, {
            store,
            router,
            localVue,
            propsData: {
                title: 'TopArtists'
            },
            /*methods: {
                getTopArtists2
            }*/
        })
    })

    it('renders loading animation when component is created', () => {
        expect(wrapper.is(TopArtists)).toBe(true)
        //expect(wrapper.find('.header-wrapper').find('.header-inside').find('h1').text()).toContain('Top Artists')
        //expect(wrapper.find('header-wrapper > .header-inside > h1').exists()).toBe(true)
        expect(getTopArtists2).toHaveBeenCalled()
        expect(wrapper.findComponent(LoadingAnimation).exists()).toBe(true)
        
    })
})