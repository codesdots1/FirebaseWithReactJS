import { Routes, Route } from 'react-router-dom';

//Components
import BookifyNav from './components/Navbar';

//Pages
import RegisterPage from './pages/Register';
import LoginPage from './pages/Login';
import ListingPage from './pages/List';
import HomePage from './pages/Books';
import BookDetailsPage from './pages/Details';
import ViewOrderPage from './pages/ViewOrder';
import ViewOrderDetailPage from './pages/ViewOrderDetail';

// CSS
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

function App() {
	return (<div>
		<BookifyNav />
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/register" element={<RegisterPage />} />
			<Route path="/book/list" element={<ListingPage />} />
			<Route path="/book/view/:bookId" element={<BookDetailsPage />} />
			<Route path="/book/order" element={<ViewOrderPage />} />
			<Route path="/book/order/:bookId" element={<ViewOrderDetailPage />} />
		</Routes>
	</div>
	);
}

export default App;
