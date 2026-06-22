const Trip = require("../models/Trip");

const generateMockTrip = ({ destination, days, budgetType, interests }) => {
  const baseCost =
    budgetType === "Low" ? 1000 :
    budgetType === "Medium" ? 2500 : 5000;

  const itinerary = Array.from({ length: days }, (_, index) => ({
    dayNumber: index + 1,
    activities: [
      {
        title: `Explore ${destination}`,
        description: `Visit places related to ${interests.join(", ") || "travel"}`,
        timeOfDay: "Morning",
        estimatedCost: baseCost,
      },
      {
        title: "Local Food Experience",
        description: "Try famous local food and markets",
        timeOfDay: "Evening",
        estimatedCost: Math.round(baseCost * 0.5),
      },
    ],
  }));

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
        item: "Shoes",
        category: "Clothing",
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
