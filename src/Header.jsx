import React from 'react'
import { useMemo } from 'react'

function Header({ cart, removeItem, updateItem, restItem, clearCart }) {

  // Calcula el total del carrito de mascotas
  const cartTotal = useMemo(
    () => cart.reduce((total, item) => total + (item.quantity * item.price), 0),
    [cart]
  )

  // Verifica si el carrito está vacío
  const isEmpty = useMemo(() => cart.length === 0, [cart])

  return (
    <header className="py-5 header">
      <div className="container-xl">
        <div className="row justify-content-center justify-content-md-between">
          <div className="col-8 col-md-3">
            <a href="index.html">
              <img className="img-fluid" src="./img/logo.png" alt="logo pet shop" />
            </a>
          </div>

          <nav className="col-md-6 mt-5 d-flex align-items-start justify-content-end">
            <div className="carrito">
              <img
                className="img-fluid"
                src="./img/carrito.png"
                alt="icono carrito de mascotas"
              />

              <div id="carrito" className="bg-white p-3">
                {isEmpty ? (
                  <p className="text-center">El carrito está vacío</p>
                ) : (
                  <>
                    <table className="w-100 table">
                      <thead>
                        <tr>
                          <th>Imagen</th>
                          <th>Nombre</th>
                          <th>Precio</th>
                          <th>Cantidad</th>
                          <th></th>
                        </tr>
                      </thead>

                      <tbody>
                        {cart.map(pet => (
                          <tr key={pet.id}>
                            <td>
                              <img
                                className="img-fluid"
                                src={`/img/${pet.image}.jpg`}
                                alt="imagen mascota"
                              />
                            </td>
                            <td>{pet.name}</td>
                            <td className="fw-bold">
                              ${pet.price}
                            </td>
                            <td className="flex align-items-start gap-4">
                              <button
                                type="button"
                                className="btn btn-dark"
                                onClick={() => restItem(pet.id)}
                              >
                                -
                              </button>

                              {pet.quantity}

                              <button
                                type="button"
                                className="btn btn-dark"
                                onClick={() => updateItem(pet.id)}
                              >
                                +
                              </button>
                            </td>
                            <td>
                              <button
                                className="btn btn-danger"
                                type="button"
                                onClick={() => removeItem(pet.id)}
                              >
                                X
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <p className="text-end">
                      Total a pagar:
                      <span className="fw-bold"> ${cartTotal}</span>
                    </p>
                  </>
                )}

                <button
                  className="btn btn-dark w-100 mt-3 p-2"
                  onClick={clearCart}
                >
                  Vaciar carrito
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
