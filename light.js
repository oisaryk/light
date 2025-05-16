const depsMap = new Map()
let currentEffect = null
const effectsStack = []

function createEffect(fn) {
  const effect = function effect(...args) {
    if (effectsStack.indexOf(effect) === -1) {
      try {
        currentEffect = effect
        effectsStack.push(effect)
        return fn(...args)
      } finally {
        effectsStack.pop()
        currentEffect = effectsStack[effectsStack.length - 1]
      }
    }
  }
  effect()
}

function render(element, content) {
  const app = document.querySelector(element)
  if (app !== null) {
    app.innerHTML = content
  }
}

function reactive(obj) {
  // Create a proxy handler
  const handler = {
    get(target, prop) {
      // Track the property access
      track(target, prop)
      
      // Get the value
      const value = target[prop]
      
      // If the value is an object, make it reactive too
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        return reactive(value)
      }
      
      return value
    },
    
    set(target, prop, value) {
      // Only trigger if the value actually changed
      if (target[prop] !== value) {
        target[prop] = value
        trigger(target, prop)
      }
      return true // Required for Proxy
    }
  }

  // Create and return the proxy
  return new Proxy(obj, handler)
}

function track(target, prop) {
  if (currentEffect) {
    let deps = depsMap.get(target)
    if (!deps) {
      deps = new Map()
      depsMap.set(target, deps)
    }
    
    let dep = deps.get(prop)
    if (!dep) {
      dep = new Set()
      deps.set(prop, dep)
    }
    
    dep.add(currentEffect)
  }
}

function trigger(target, prop) {
  const deps = depsMap.get(target)
  if (!deps) return
  
  const dep = deps.get(prop)
  if (dep) {
    // Create a new Set to avoid infinite loops
    const effectsToRun = new Set(dep)
    effectsToRun.forEach(effect => effect())
  }
}