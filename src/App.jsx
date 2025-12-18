import { useState, useEffect } from 'react'
import Header from './Header'
import Pet from './Pet'
import { db } from './data/db'
import './App.css'

function App() {
  
  /** 1. CONFIGURACIÓN INICIAL Y ESTADOS **/

  // Función para inicializar el carrito consultando el Local Storage
  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart') 
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  // Estado para la base de datos de mascotas
  const [data] = useState(db)

  // Estado para el carrito de mascotas
  const [cart, setCart] = useState(initialCart)

  // Constantes de límites de cantidad
  const MAX_ITEM = 5
  const MIN_ITEM = 1

  /** 2. EFECTOS (Side Effects) **/

  // Sincroniza el carrito con Local Storage cada vez que cambia
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  /** 3. FUNCIONES DE LÓGICA DEL NEGOCIO (Carrito) **/

  // Agrega una mascota al carrito o incrementa su cantidad
  const addToCart = (pet) => {
    const petExists = cart.findIndex(item => item.id === pet.id)
    
    if (petExists >= 0) {
      if (cart[petExists].quantity >= MAX_ITEM) return
      const updatedCart = [...cart]
      updatedCart[petExists].quantity++
      setCart(updatedCart)
    } else {
      pet.quantity = 1
      setCart([...cart, pet])
    }
  }

  // Elimina una mascota del carrito
  const removeItem = (id) => {
    setCart(prevCart => prevCart.filter(pet => pet.id !== id))
  }

  // Incrementa la cantidad de una mascota
  const updateItem = (id) => {
    const updatedCart = cart.map(pet => {
      if (pet.id === id && pet.quantity < MAX_ITEM) {
        return {
          ...pet,
          quantity: pet.quantity + 1
        }
      }
      return pet
    })
    setCart(updatedCart)
  }

  // Reduce la cantidad de una mascota (sin bajar del mínimo)
  const restItem = (id) => {
    const updatedCart = cart.map(pet => {
      if (pet.id === id && pet.quantity > MIN_ITEM) {
        return {
          ...pet,
          quantity: pet.quantity - 1
        }
      }
      return pet
    })
    setCart(updatedCart)
  }

  // Vacía el carrito por completo
  const clearCart = () => {
    setCart([])
  }

  /** 4. RENDERIZADO DEL COMPONENTE **/

  return (
    <>
      {/* Header con la gestión visual del carrito de mascotas */}
      <Header 
        cart={cart}
        clearCart={clearCart}
        updateItem={updateItem}
        restItem={restItem}
        removeItem={removeItem}
      />
      
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestros productos Pet Shop</h2>

        <div className="row mt-5">
          {/* Renderizado de cada mascota */}
          {data.map((pet) => (
            <Pet 
              key={pet.id}
              pet={pet}
              addToCart={addToCart}
            />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            Pet Shops RD - Todos los derechos reservados
          </p>
        </div>
      </footer>
    </>
  )
}

export default App
