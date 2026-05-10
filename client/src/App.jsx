import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Shop from "./pages/Shop";
import AdminLayout from "./components/AdminLayout";
import AdminOverview from "./pages/AdminOverview";
import AdminProducts from "./pages/AdminProducts";
import AdminProductForm from "./pages/AdminProductForm";
import AdminOrders from "./pages/AdminOrders";
import AdminContacts from "./pages/AdminContacts";
import AdminUsers from "./pages/AdminUsers";
import AdminCategories from "./pages/AdminCategories";
import AdminPayments from "./pages/AdminPayments";
import MyOrders from "./pages/MyOrders";
import Contact from "./pages/Contact";
import Checkout from "./pages/Checkout";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Search from "./pages/Search";
import Article from "./pages/Article";
import CareAndService from "./pages/CareAndService";
import FAQ from "./pages/FAQ";
import Reviews from "./pages/Reviews";
import Services from "./pages/Services";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { WaitlistProvider } from "./context/WaitlistContext";
import Waitlist from "./pages/Waitlist";

import { NotificationProvider } from "./context/NotificationContext";
import Notification from "./components/Notification";

const App = () => {
  return (
    <AuthProvider>
      <NotificationProvider>
        <WaitlistProvider>
          <CartProvider>
            <Router>
              <Navbar />
              <Notification />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/shop/men" element={<Shop category="men" />} />
                <Route path="/shop/women" element={<Shop category="women" />} />
                <Route path="/shop/kids" element={<Shop category="kids" />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/my-orders" element={<MyOrders />} />
                <Route path="/checkout" element={<Checkout />} />

                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminOverview />} />
                  <Route path="products" element={<AdminProducts />} />
                  <Route path="products/new" element={<AdminProductForm />} />
                  <Route path="products/edit/:id" element={<AdminProductForm />} />
                  <Route path="categories" element={<AdminCategories />} />
                  <Route path="orders" element={<AdminOrders />} />
                  <Route path="payments" element={<AdminPayments />} />

                  <Route path="contacts" element={<AdminContacts />} />
                  <Route path="users" element={<AdminUsers />} />
                </Route>

                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<Article />} />
                <Route path="/about" element={<About />} />
                <Route path="/search" element={<Search />} />
                <Route path="/care-and-service" element={<CareAndService />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/services" element={<Services />} />
                <Route path="/waitlist" element={<Waitlist />} />
              </Routes>
              <Footer />
            </Router>
          </CartProvider>
        </WaitlistProvider>
      </NotificationProvider>
    </AuthProvider>
  );
};

export default App;
