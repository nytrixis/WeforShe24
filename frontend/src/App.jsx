import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"
import Category from "./pages/Category"
import Product from "./pages/Product"
import Footer from "./components/Footer"
import electronicsBanner from "./assets/electronicsbanner.png"
import cosmeticsBanner from "./assets/cosmeticsbanner.png"
import clothingBanner from "./assets/clothingbanner.png"
import Cart from "./pages/Cart"
import Login from "./pages/Login"



function App() {
 
  return (
    <main className="text-tertiary">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/clothing" element={<Category category={"clothing"} banner={clothingBanner} />} />
          <Route path="/cosmetics" element={<Category category={"cosmetics"} banner={cosmeticsBanner} /> } />
          <Route path="/electronics" element={<Category category={"electronics"} banner={electronicsBanner}/>} />
          <Route path="/product" element={<Product />} >
            <Route path=":productId" element={<Product />}/>
          </Route>
          <Route path="/cart-page" element={<Cart />} /> 
          <Route path="/login" element={<Login />} /> 
        </Routes>
        <Footer />
      </BrowserRouter>
    </main>
  )
}

export default App
