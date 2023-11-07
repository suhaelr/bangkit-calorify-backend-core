const express = require('express');
const { getBMIbyId } = require('../controller/api/bmiController');
const { getBMRbyId } = require('../controller/api/bmrcontroller');
const {getNews} = require('../controller/api/newsController');
const {postNutrition, getNutrition, deleteNutrition, getTotalCalories} = require('../controller/api/nutritionController');
const router = express.Router();

router.get('/bmibyid/:id', getBMIbyId);

router.get('/bmrbyid/:id', getBMRbyId);
router.get('/news', getNews);

// router.get('/nutrition', getNutrition);
router.post('/nutrition', postNutrition);
router.get('/nutrition', getNutrition);
router.get('/nutrition/totalcal', getTotalCalories);
router.delete('/nutrition/:id', deleteNutrition);



module.exports = {
  routes : router
}

