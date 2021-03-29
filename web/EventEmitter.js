class EventEmitter {
    constructor () {
      this.handles = {}
    }
    on (event, fn) {
      if (!this.handles[event]) {
        this.handles[event] = []
      } 
      this.handles[event].push(fn)
    }
    emit (event, value) {
      this.handles[event].forEach(fn => {
        fn(value)
      })
    }
    off (event,fn) {
      const callbacks= this.handles[event]
      const index = callbacks.indexOf(fn)
      if(index!==-1){
        callbacks.splice(index,1) 
      }
    }
  }
  
  export default new EventEmitter()
  