const express = require('express');
const router = express.Router();

const mainController = require('./controllers/mainController');
const searchController = require('./controllers/searchController');


router.get('/', mainController.homePage);
router.get('/:name/:id', mainController.cardPage);
router.get('/search', searchController.searchPage);
router.get('/search/element?element=:element', searchController.resultPage);
router.get('/deck', mainController.deckList);
router.get('/deck/add/:id', mainController.addCardOnDeck);
router.get('/deck/delete/:id', mainController.deleteCardOnDeck);

module.exports = router;