const Datastore = require('nedb');
const db = new Datastore();

const createCard =(req, res) => {
    const userId = req.params.userId;
    const { cardNumber, balance } = req.body;
  
    // Validate input data
    if (!cardNumber || isNaN(balance)) {
      return res.status(400).json({ error: 'Invalid input data' });
    }
  
    // Create a new card in the database
    const newCard = {
      userId,
      cardNumber,
      balance: parseFloat(balance),
      transactionHistory: [], // Initialize an empty transaction history array
    };
  
    // Replace the following with your actual database insert logic
    db.insert(newCard, (err, card) => {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json(card);
    });
}
  
  // Fetch cards for a user
  const getCardsByUserId = (req, res) => {
    const userId = req.params.userId;
  
    // Fetch cards for the user from the database
    db.find({ userId: userId }, (err, cards) => {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json(cards);
    });
}

const runTransaction=(req, res) => {
    const cardId = req.params.cardId;
    const { amount } = req.body;
  
    // Perform transaction and update the database
    db.update({ _id: cardId }, { $inc: { balance: -amount }, $push: { transactionHistory: { amount, timestamp: new Date() } } }, {}, (err, numAffected) => {
      if (err || numAffected === 0) {
        return res.status(400).json({ error: 'Invalid transaction' });
      }
  
      res.json({ success: true });
    });
}
const trackTransactionHistory=(req, res) => {
    const cardId = req.params.cardId;
  
    // Fetch transaction history from the database
    db.findOne({ _id: cardId }, (err, card) => {
      if (err || !card) {
        return res.status(404).json({ error: 'Card not found' });
      }
  
      // Extract and return transaction history
      const transactionHistory = card.transactionHistory || [];
      res.json(transactionHistory);
    });
  }
  const viewBalance = (req, res) => {
    const cardId = req.params.cardId;
  
    // Fetch card details from the database
    db.findOne({ _id: cardId }, (err, card) => {
      if (err || !card) {
        return res.status(404).json({ error: 'Card not found' });
      }
  
      res.json({ balance: card.balance });
    });
  }
  const retrieveCardDetails = (req, res) => {
    const cardId = req.params.cardId;
  
    // Fetch card details from the database
    db.findOne({ _id: cardId }, (err, card) => {
      if (err || !card) {
        return res.status(404).json({ error: 'Card not found' });
      }
  
      res.json(card);
    });
  }
  

module.exports={createCard,getCardsByUserId,runTransaction,trackTransactionHistory,viewBalance,retrieveCardDetails}