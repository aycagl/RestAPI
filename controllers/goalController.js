//get user goals and save to db

const Goal = require('../models/Goal');

const setGoals = async (req, res) => {
  try {
    const userId = req.user.id; // JWT user ID
    const { type, goalData } = req.body; 

    if (!goalData || !goalData.food || !goalData.water || !goalData.electricity || !goalData.transportation || !goalData.carbonFootprint) {
      return res.status(400).json({ message: 'Please provide valid target data.' });
    }

    const newGoal = new Goal({
      userId,
      type,
      goalData,
    });

    await newGoal.save();

    res.status(201).json({
      message: 'Goal successfully created.',
      goal: newGoal,
    });
  } catch (error) {
    console.error('Error in setGoals:', error.message);
    res.status(500).json({ message: 'Server error.' });
  }
};

const getGoalsByUserId = async (req, res) => {
  try {
    console.log('Request Params:', req.params); 
    const { userId } = req.params;

    const goals = await Goal.find({ userId });

    if (!goals || goals.length === 0) {
      return res.status(404).json({ message: 'No goals found for this user.' });
    }

    res.status(200).json({
      message: 'User goals retrieved successfully.',
      goals,
    });
  } catch (error) {
    console.error('Error in getGoalsByUserId:', error.message);
    res.status(500).json({ message: 'Server error.' });
  }
};


module.exports = { setGoals, getGoalsByUserId };
