import { get as fetch } from 'axios'

export const get = async endpoint => await fetch(endpoint)
