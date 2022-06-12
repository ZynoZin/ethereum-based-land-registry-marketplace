import './App.css';
import React, { useContext, useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Identity from './components/Identity/Identity';
import Regisration from './components/Registration/Registration';
import Dashboard from './components/Dashboard/Dashboard';
import { EthereumContext } from "./context/EthereumContext";
import {Routes, Route } from "react-router-dom";

function App() {
	const [accountType, setAccountType] = useState('');
	const { checkIfWalletIsConnected, setConnectedAccount } = useContext(EthereumContext);
	window.ethereum.on('accountsChanged', async () => {
    	setConnectedAccount(null);
	});
	return (
			<>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/identity" element={<Identity setAccountType = {setAccountType} />} />
					<Route path="/registration" element={<Regisration accountType = {accountType}/>} />
					<Route path="/dashboard" element={<Dashboard />} />
				</Routes>
			</>

	);
}

export default App;
