class EventEmitter {
  constructor() {
    this.events = {}
  }
  on = function (eventName, listener) {
    if (!this.events.hasOwnProperty(eventName)) {
      this.events[eventName] = []
    }
    this.events[eventName].push(listener)
  }
  emit = function (eventName, ...params) {
    if (this.events[eventName]) {
      const allCbs = this.events[eventName]
      allCbs.forEach((listener) => {
        listener(...params)
      })
    }
  }
  off = function (eventName, listener) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(
        (cb) => cb !== listener
      )
    }
  }
  subscribeOnce = function (eventName, listener) {
    const wrapper = (...args) => {
      listener(...args)
      this.off(eventName, wrapper)
    }
    this.on(eventName, wrapper)
  }
}

const listener1 = (name, age) =>
  console.log(`Hello ${name}, Your age is ${age} yrs`)
const listener2 = (designation, age, company) =>
  console.log(`${designation},${age},${company}`)

const emitter = new EventEmitter()
emitter.on('great', listener1)
emitter.subscribeOnce('great', listener2)
emitter.emit('great', 'Batman', '24', 'Earth')
// emitter.off('great', listener2)
emitter.emit('great', 'Super man', '24', 'Krypton')
emitter.emit('great', 'spiderman', '26', 'earth')