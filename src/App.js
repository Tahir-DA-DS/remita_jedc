import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import RegistrationForm from './components/registration'
import Detailspage from './components/details'
import './App.css'
import Header from './components/navsection'
import CreateRRR from './components/RRRgen';

function App() {
  return (
    <Router>

    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={ <RegistrationForm />}/>
        <Route path="/details" element={ <Detailspage />}/>
        <Route path="/gen-invoice" element={<CreateRRR />} />
      </Routes>
     
    </div>

    </Router>
  );
}

export default App;
