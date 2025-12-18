

 function Pet({pet, addToCart }) {

  


  
/*const [auth, setAuth]= useState(false)
   useEffect(()=>{
    if(auth){
     console.log('Autenticado')}
   },[auth])

   setTimeout(()=>{
    setAuth(true)
   }, 3000)

   setTimeout (()=>{})*/

  return (
   
    <>

            <div className="col-md-6 col-lg-4 my-4 row align-items-center" key={pet.id}>
                <div className="col-4">
                    <img className="img-fluid" src={`/img/${pet.image}.jpg`} alt="imagen petra" />
                </div>
                <div className="col-8">
                    <h3 className="text-black fs-4 fw-bold text-uppercase">{pet.name}</h3>
                    <p>{pet.description}</p>
                    <p className="fw-black text-primary fs-3">$ {pet.price}</p>
                    <button 
                        type="button"
                        className="btn btn-dark w-100"
                        onClick={()=>addToCart(pet)}
                    >Agregar al Carrito</button>
                </div>
          
            </div>

    </>
  )
}

export default Pet
