export const AUTOPET_ABI = [{"inputs": [{"internalType": "uint256", "name": "_fee", "type": "uint256"}], "stateMutability": "nonpayable", "type": "constructor"}, {"anonymous": false, "inputs": [{"indexed": false, "internalType": "uint256", "name": "fee", "type": "uint256"}], "name": "FeeChanged", "type": "event"}, {"anonymous": false, "inputs": [{"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"}], "name": "GhstTokenApproved", "type": "event"}, {"anonymous": false, "inputs": [{"indexed": false, "internalType": "address", "name": "operator", "type": "address"}], "name": "OperatorChanged", "type": "event"}, {"anonymous": false, "inputs": [{"indexed": true, "internalType": "address", "name": "previousOwner", "type": "address"}, {"indexed": true, "internalType": "address", "name": "newOwner", "type": "address"}], "name": "OwnershipTransferred", "type": "event"}, {"anonymous": false, "inputs": [{"indexed": true, "internalType": "address", "name": "user", "type": "address"}, {"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"}], "name": "Subscribed", "type": "event"}, {"anonymous": false, "inputs": [{"indexed": false, "internalType": "uint256[]", "name": "_ids", "type": "uint256[]"}, {"indexed": false, "internalType": "uint256[]", "name": "_values", "type": "uint256[]"}], "name": "TicketsClaimed", "type": "event"}, {"anonymous": false, "inputs": [{"indexed": false, "internalType": "uint256[]", "name": "_ids", "type": "uint256[]"}, {"indexed": false, "internalType": "uint256[]", "name": "_values", "type": "uint256[]"}], "name": "TicketsWithdrawn", "type": "event"}, {"anonymous": false, "inputs": [{"indexed": true, "internalType": "address", "name": "user", "type": "address"}, {"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"}], "name": "Unsubscribed", "type": "event"}, {"inputs": [], "name": "aavegotchi", "outputs": [{"internalType": "contract Aavegotchi", "name": "", "type": "address"}], "stateMutability": "view", "type": "function", "constant": true}, {"inputs": [{"internalType": "address", "name": "", "type": "address"}], "name": "deposits", "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}], "stateMutability": "view", "type": "function", "constant": true}, {"inputs": [], "name": "fee", "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}], "stateMutability": "view", "type": "function", "constant": true}, {"inputs": [], "name": "ghstStaking", "outputs": [{"internalType": "contract GHSTStaking", "name": "", "type": "address"}], "stateMutability": "view", "type": "function", "constant": true}, {"inputs": [], "name": "ghstToken", "outputs": [{"internalType": "contract IERC20", "name": "", "type": "address"}], "stateMutability": "view", "type": "function", "constant": true}, {"inputs": [], "name": "operator", "outputs": [{"internalType": "address", "name": "", "type": "address"}], "stateMutability": "view", "type": "function", "constant": true}, {"inputs": [], "name": "owner", "outputs": [{"internalType": "address", "name": "", "type": "address"}], "stateMutability": "view", "type": "function", "constant": true}, {"inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function"}, {"inputs": [{"internalType": "address", "name": "newOwner", "type": "address"}], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function"}, {"inputs": [], "name": "totalStaked", "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}], "stateMutability": "view", "type": "function", "constant": true}, {"inputs": [], "name": "frens", "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}], "stateMutability": "view", "type": "function", "constant": true}, {"inputs": [], "name": "totalUsers", "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}], "stateMutability": "view", "type": "function", "constant": true}, {"inputs": [{"internalType": "uint256", "name": "_index", "type": "uint256"}], "name": "userAt", "outputs": [{"internalType": "address", "name": "", "type": "address"}], "stateMutability": "view", "type": "function", "constant": true}, {"inputs": [], "name": "allUsers", "outputs": [{"internalType": "address[]", "name": "", "type": "address[]"}], "stateMutability": "view", "type": "function", "constant": true}, {"inputs": [], "name": "subscribe", "outputs": [], "stateMutability": "nonpayable", "type": "function"}, {"inputs": [], "name": "unsubscribe", "outputs": [], "stateMutability": "nonpayable", "type": "function"}, {"inputs": [{"internalType": "uint256[]", "name": "_tokenIds", "type": "uint256[]"}], "name": "interact", "outputs": [], "stateMutability": "nonpayable", "type": "function"}, {"inputs": [{"internalType": "uint256", "name": "_fee", "type": "uint256"}], "name": "setFee", "outputs": [], "stateMutability": "nonpayable", "type": "function"}, {"inputs": [{"internalType": "address", "name": "_operator", "type": "address"}], "name": "setOperator", "outputs": [], "stateMutability": "nonpayable", "type": "function"}, {"inputs": [{"internalType": "uint256", "name": "_amount", "type": "uint256"}], "name": "approveGhstStaking", "outputs": [], "stateMutability": "nonpayable", "type": "function"}, {"inputs": [{"internalType": "uint256[]", "name": "_ids", "type": "uint256[]"}, {"internalType": "uint256[]", "name": "_values", "type": "uint256[]"}], "name": "claimTickets", "outputs": [], "stateMutability": "nonpayable", "type": "function"}, {"inputs": [{"internalType": "uint256[]", "name": "_ids", "type": "uint256[]"}, {"internalType": "uint256[]", "name": "_values", "type": "uint256[]"}], "name": "withdrawTickets", "outputs": [], "stateMutability": "nonpayable", "type": "function"}]