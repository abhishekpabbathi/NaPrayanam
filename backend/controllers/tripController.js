const Trip = require("../models/Trip");

const generateMockTrip = ({ destination, days, budgetType, interests }) => {
  const baseCost =
    budgetType === "Low" ? 1000 :
    budgetType === "Medium" ? 2500 : 5000;

  const commonActivities = [
    {
      morning: "Explore Famous Local Landmarks",
      morningCost: 2500,
      evening: "Authentic Local Food Experience",
      eveningCost: 1200,
    },
    {
      morning: "Guided City Walking Tour",
      morningCost: 1800,
      evening: "Local Market & Shopping Visit",
      eveningCost: 3000,
    },
    {
      morning: "Historical & Cultural Attraction",
      morningCost: 2200,
      evening: "Sunset Viewpoint Experience",
      eveningCost: 1000,
    },
    {
      morning: "Nature & Scenic Exploration",
      morningCost: 1500,
      evening: "Street Food Discovery",
      eveningCost: 900,
    },
    {
      morning: "Museum & Heritage Visit",
      morningCost: 2000,
      evening: "Photography & Sightseeing Tour",
      eveningCost: 1200,
    },
    {
      morning: "Popular Tourist Attraction",
      morningCost: 2800,
      evening: "Local Cultural Event",
      eveningCost: 1500,
    },
    {
      morning: "Hidden Gems Exploration",
      morningCost: 1700,
      evening: "Evening City Walk",
      eveningCost: 800,
    },
    {
      morning: "Adventure Activity Experience",
      morningCost: 3500,
      evening: "Relaxation & Café Visit",
      eveningCost: 1000,
    },
    {
      morning: "Nearby Day Excursion",
      morningCost: 4500,
      evening: "Souvenir Shopping",
      eveningCost: 1800,
    },
    {
      morning: "Final Destination Highlights Tour",
      morningCost: 2500,
      evening: "Departure Preparation & Relaxation",
      eveningCost: 700,
    },
  ];

  const itinerary = Array.from({ length: days }, (_, index) => {
    const activity =
      commonActivities[index % commonActivities.length];

    return {
      dayNumber: index + 1,
      activities: [
        {
          title: activity.morning,
          description: `Discover important places and experiences in ${destination}`,
          timeOfDay: "Morning",
          estimatedCost: Math.round(
            activity.morningCost *
              (budgetType === "Low"
                ? 0.7
                : budgetType === "High"
                ? 1.5
                : 1)
          ),
        },
        {
          title: activity.evening,
          description: `Enjoy local culture, food and entertainment in ${destination}`,
          timeOfDay: "Evening",
          estimatedCost: Math.round(
            activity.eveningCost *
              (budgetType === "Low"
                ? 0.7
                : budgetType === "High"
                ? 1.5
                : 1)
          ),
        },
      ],
    };
  });

  return {
    itinerary,
    estimatedBudget: {
      transport: baseCost * days,
      accommodation: baseCost * days,
      food: Math.round(baseCost * 0.6 * days),
      activities: Math.round(baseCost * 0.8 * days),
      total: Math.round(baseCost * 3.4 * days),
    },
    hotels: [
      {
        name: `${destination} Budget Stay`,
        tier: "Budget",
        pricePerNight: baseCost,
        rating: "4.0/5",
      },
      {
        name: `${destination} Comfort Hotel`,
        tier: "Mid Range",
        pricePerNight: baseCost * 2,
        rating: "4.4/5",
      },
      {
        name: `${destination} Luxury Palace`,
        tier: "Luxury",
        pricePerNight: baseCost * 4,
        rating: "4.8/5",
      },
    ],
    packingList: [
      {
        item: "Passport / ID",
        category: "Documents",
        isPacked: false,
      },
      {
        item: "Phone Charger",
        category: "Electronics",
        isPacked: false,
      },
      {
        item: "Power Bank",
        category: "Electronics",
        isPacked: false,
      },
      {
        item: "Comfortable Shoes",
        category: "Clothing",
        isPacked: false,
      },
      {
        item: "Water Bottle",
        category: "Travel Essentials",
        isPacked: false,
      },
    ],
  };
};

const createTrip = async (req, res) => {
  try {
    const { destination, days, budgetType, interests } = req.body;

    const generatedData = generateMockTrip({
      destination,
      days: Number(days),
      budgetType,
      interests: interests || [],
    });

    const trip = await Trip.create({
      user: req.user._id,
      destination,
      days,
      budgetType,
      interests: interests || [],
      ...generatedData,
    });

    res.status(201).json({
      message: "Trip created successfully",
      trip,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    res.json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    res.json({
      message: "Trip updated successfully",
      trip,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    res.json({
      message: "Trip deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTrip,
  getMyTrips,
  getTripById,
  updateTrip,
  deleteTrip,
};
