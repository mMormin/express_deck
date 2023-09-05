const express = require('express');
const mainController = require('./controllers/mainController');
const searchController = require('./controllers/searchController');

const router = express.Router();

router.get('/', mainController.homePage);
router.get('/card/:name', mainController.cardPage);
router.get('/deck', mainController.deckList);
router.get('/deck/add/:id', mainController.addCardOnDeck);
router.get('/deck/delete/:id', mainController.deleteCardOnDeck);
router.get('/search', searchController.searchPage);
router.get('/search/result', searchController.resultPage);

module.exports = router;