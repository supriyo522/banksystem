const express = require('express');
const router = express.Router();

const {createCard,getCardsByUserId,runTransaction,trackTransactionHistory,viewBalance,retrieveCardDetails} = require('../controller/card.controller');

// Create a new card for a user
router.post('/cards/:userId', createCard);

// Fetch cards for a user
router.get('/cards/:userId', getCardsByUserId);

// Run transactions against the card
router.post('/transactions/:cardId', runTransaction);

// Track transaction history
router.get('/transactions/:cardId', trackTransactionHistory);


// View the current balance of a card
router.get('/balance/:cardId', viewBalance);
// Retrieve card details
router.get('/card/:cardId', retrieveCardDetails);




module.exports=router;