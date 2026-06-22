const Trip = require("../models/Trip");

const generateMockTrip = ({ destination, days, budgetType, interests }) => {
  const baseCost =
    budgetType === "Low" ? 1000 :
    budgetType === "Medium" ? 2500 : 5000;

  const budgetMultiplier =
    budgetType === "Low" ? 0.8 :
    budgetType === "Medium" ? 1 : 1.6;

  const activityTemplates = [
    {
      morning: "City Orientation Tour",
      morningDesc: "Explore the main streets, important areas, local transport points and first-time visitor highlights.",
      evening: "Local Cafe Experience",
      eveningDesc: "Relax at a popular local cafe and understand the food culture of the destination.",
      morningCost: 1600,
      eveningCost: 900,
    },
    {
      morning: "Famous Landmark Visit",
      morningDesc: "Visit well-known landmarks, monuments or important tourist attractions around the destination.",
      evening: "Local Market Shopping",
      eveningDesc: "Explore local markets, shopping streets and souvenir spots.",
      morningCost: 2200,
      eveningCost: 1800,
    },
    {
      morning: "Museum & Heritage Exploration",
      morningDesc: "Discover history, culture, art, architecture or heritage places connected to the destination.",
      evening: "Street Food Trail",
      eveningDesc: "Try popular local snacks, traditional dishes and evening food stalls.",
      morningCost: 2000,
      eveningCost: 1200,
    },
    {
      morning: "Nature Park or Scenic Spot",
      morningDesc: "Spend time in a peaceful nature area, lake, garden, viewpoint or scenic location.",
      evening: "Sunset Photography Walk",
      eveningDesc: "Capture travel memories during golden hour at a beautiful viewing point.",
      morningCost: 1400,
      eveningCost: 800,
    },
    {
      morning: "Guided Walking Tour",
      morningDesc: "Walk through local neighborhoods, cultural streets and hidden gems.",
      evening: "Cultural Show or Local Event",
      eveningDesc: "Experience music, art, local performance, festival area or community event.",
      morningCost: 1800,
      eveningCost: 2200,
    },
    {
      morning: "Adventure or Outdoor Activity",
      morningDesc: "Try an outdoor activity, short trek, cycling, boating or other destination-friendly adventure.",
      evening: "Signature Restaurant Experience",
      eveningDesc: "Have dinner at a well-rated restaurant and try a signature local dish.",
      morningCost: 3500,
      eveningCost: 2500,
    },
    {
      morning: "Hidden Gems Exploration",
      morningDesc: "Explore less crowded places, peaceful corners, unique streets and local recommendations.",
      evening: "Night City Walk",
      eveningDesc: "Enjoy safe evening areas, lights, city views and relaxed nightlife spots.",
      morningCost: 1700,
      eveningCost: 1100,
    },
    {
      morning: "Nearby Day Excursion",
      morningDesc: "Visit a nearby attraction, village, beach, hill, temple, fort or countryside location.",
      evening: "Relaxation and Recovery Time",
      eveningDesc: "Slow down, rest, organize photos and prepare for the next travel day.",
      morningCost: 4500,
      eveningCost: 700,
    },
    {
      morning: "Local Life Experience",
      morningDesc: "Observe local lifestyle, public places, small businesses and everyday culture.",
      evening: "Souvenir Shopping",
      eveningDesc: "Buy gifts, local products and memorable items from trusted shops.",
      morningCost: 1200,
      eveningCost: 1600,
    },
    {
      morning: "Final Highlights Tour",
      morningDesc: "Revisit missed highlights and complete the important experiences of the destination.",
      evening: "Departure Preparation",
      eveningDesc: "Pack bags, check tickets, arrange transport and prepare for departure.",
      morningCost: 1800,
      eveningCost: 600,
    },
  ];

  const selectedInterests =
    interests && interests.length > 0
      ? interests.join(", ")
      : "sightseeing, culture, food and local experiences";

  const itinerary = Array.from({ length: days }, (_, index) => {
    const template = activityTemplates[index % activityTemplates.length];

    return {
      dayNumber: index + 1,
      activities: [
        {
          title: template.morning,
          description: `${template.morningDesc} Planned around ${destination} with focus on ${selectedInterests}.`,
          timeOfDay: "Morning",
          estimatedCost: Math.round(
            (template.morningCost + index * 180) * budgetMultiplier
          ),
        },
        {
          title: template.evening,
          description: `${template.eveningDesc} This keeps the trip balanced, practical and memorable.`,
          timeOfDay: "Evening",
          estimatedCost: Math.round(
            (template.eveningCost + index * 120) * budgetMultiplier
          ),
        },
      ],
    };
  });

  const activityTotal = itinerary.reduce((sum, day) => {
    return (
      sum +
      day.activities.reduce(
        (activitySum, activity) => activitySum + activity.estimatedCost,
        0
      )
    );
  }, 0);

  const transport = Math.round(baseCost * days * 0.9);
  const accommodation = Math.round(baseCost * days * 1.2);
  const food = Math.round(baseCost * days * 0.7);
  const activities = activityTotal;
  const total = transport + accommodation + food + activities;

  return {
    itinerary,
    estimatedBudget: {
      transport,
      accommodation,
      food,
      activities,
      total,
    },
    hotels: [
      {
        name: `${destination} Budget Stay`,
        tier: "Budget",
        pricePerNight: Math.round(baseCost * 0.9),
        rating: "4.0/5",
      },
      {
        name: `${destination} Comfort Hotel`,
        tier: "Mid Range",
        pricePerNight: Math.round(baseCost * 1.8),
        rating: "4.4/5",
      },
      {
        name: `${destination} Premium Suites`,
        tier: "Luxury",
        pricePerNight: Math.round(baseCost * 3.5),
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
      {
        item: "Basic First Aid",
        category: "Safety",
        isPacked: false,
      },
    ],
  };
};

const createTrip = async (req, res) => {
  try {
    const { destination, days, budgetType, interests } = req.body;

    if (!destination || !days || !budgetType) {
      return res.status(400).json({
        message: "Destination, days and budget type are required",
      });
    }

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
    const trips = await Trip.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

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
