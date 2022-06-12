import React, { useEffect, useState } from "react";
import { ethers } from 'ethers';
import { landContractABI, landContractAddress, userContractABI, userContractAddress } from "../utils/constants";

export const EthereumContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = (contractAddress, contractABI) => {
  	const provider = new ethers.providers.Web3Provider(ethereum);
  	const signer = provider.getSigner();
	const contract = new ethers.Contract(contractAddress, contractABI, signer);
  	return contract;
}


export const EthereumProvider = ({ children }) => {

	const [connectedAccount, setConnectedAccount] = useState(null);
	const getAllLands = async() => {
		try {
			if (!ethereum) return alert('Please install metamask!');

			const landContract = getEthereumContract(landContractAddress, landContractABI);
			const availableLands = await landContract.getAllLands();

			console.log(availableLands);

		} catch (error) {
			
		}
	}

	
	const getAllUsers = async() => {
		try {
			if (!ethereum) return alert('Please install metamask!');

			const userContract = getEthereumContract(userContractAddress, userContractABI);
			const existentUsers = await userContract.getAllUsers();
			console.log(existentUsers);
			return existentUsers;
		} catch (error) {
			console.log(error);
			throw new Error('Couldn\'t get the list of users.');
		}
	
	}

	const registerUser = async(name, verificationCode, age, address) => {
		try {
			if (!ethereum) return alert('Please install metamask!');

			const userContract = getEthereumContract(userContractAddress, userContractABI);
			const user = await userContract.createUser(name, verificationCode, age, address);
			console.log(user);
		} catch (error) {
			console.log(error);
			throw new Error('Couldn\'t register user');
		}
	}

	const setLandInspector = async() => {
		try {
			const users = await getAllUsers();
			const id = users.findIndex(user => user.userAddress.toLowerCase() === connectedAccount.toLowerCase());
			const userContract = getEthereumContract(userContractAddress, userContractABI);
			await userContract.setLandInspector(id);
		} catch (error) {
			console.log(error);
			throw new Error('Couldn\'t find user');
		}
	}
	const checkIfWalletIsConnected = async()=> {
		try {
			if (!ethereum) return alert('Please install metamask!');

			const accounts = await ethereum.request({ method: 'eth_accounts' });
			if (accounts.length) {
				setConnectedAccount(accounts[0]);
				getAllUsers();
			} else {
				console.log('No accounts found');
			}
			
		} catch (error) {
			console.log(error);
			throw new Error('No Ethereum wallet found!');
		}
	}

	useEffect(() => {
		checkIfWalletIsConnected();
	}, []);

	const connectWallet = async() => {
		try {
			if (!ethereum) return alert('Please install metamask!');

			const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
			setConnectedAccount(accounts[0]);
		} catch(error){
			console.log(error);
			throw new Error('No Ethereum wallet found!');
		}
	}

	return (
		<EthereumContext.Provider value={{ connectWallet, setLandInspector, setConnectedAccount, connectedAccount, registerUser, getAllUsers }}>
			{children}
		</EthereumContext.Provider>
	)
}