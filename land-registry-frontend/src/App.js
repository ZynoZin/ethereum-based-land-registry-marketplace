import './App.css';
import React, { useContext, useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Identity from './components/Identity/Identity';
import Regisration from './components/Registration/Registration';
import Dashboard from './components/Dashboard/Dashboard';
import { EthereumContext } from "./context/EthereumContext";


function App() {
	const [accountType, setAccountType] = useState('')
	const { connectWallet, setConnectedAccount } = useContext(EthereumContext);
	window.ethereum.on('accountsChanged', async () => {
    	setConnectedAccount(null);
	});
	return (
		<>
			<Navbar/>
			<Dashboard/>
			{/* <Home /> */}
			{/* <Identity setAccountType = {setAccountType} />
			<Regisration accountType = {accountType}/> */}

		</>

	);
}

export default App;
